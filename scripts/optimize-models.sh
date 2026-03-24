#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────
# optimize-models.sh — Placeholder script for future model optimization.
#
# When ready, install:  npm i -D @gltf-transform/cli
# Then this script will process all GLB files in public/assets/models/:
#   - Draco-compress geometry
#   - Resize textures to max 1024
#   - Quantize vertex attributes
#   - Remove unused materials/nodes
#
# Usage:  bash scripts/optimize-models.sh
# ──────────────────────────────────────────────────────────────────────────

set -euo pipefail

MODEL_DIR="public/assets/models"
OUT_DIR="public/assets/models"  # overwrite in-place (originals should be in version control)

echo "=== Model Optimization Pipeline ==="
echo ""

# Check for gltf-transform
if ! npx gltf-transform --version > /dev/null 2>&1; then
  echo "ERROR: @gltf-transform/cli is not installed."
  echo "Run:  npm i -D @gltf-transform/cli"
  exit 1
fi

# Find all .glb files
shopt -s nullglob
files=("$MODEL_DIR"/*.glb)

if [ ${#files[@]} -eq 0 ]; then
  echo "No .glb files found in $MODEL_DIR — nothing to optimize."
  exit 0
fi

echo "Found ${#files[@]} model(s) to optimize."
echo ""

for file in "${files[@]}"; do
  name=$(basename "$file")
  echo "Processing: $name"

  # 1. Draco compression
  npx gltf-transform draco "$file" "$OUT_DIR/$name" \
    --method edgebreaker 2>/dev/null || true

  # 2. Resize textures (max 1024px)
  npx gltf-transform resize "$OUT_DIR/$name" "$OUT_DIR/$name" \
    --width 1024 --height 1024 2>/dev/null || true

  # 3. Quantize vertex data
  npx gltf-transform quantize "$OUT_DIR/$name" "$OUT_DIR/$name" 2>/dev/null || true

  # 4. Prune unused nodes/materials
  npx gltf-transform prune "$OUT_DIR/$name" "$OUT_DIR/$name" 2>/dev/null || true

  echo "  Done: $name"
done

echo ""
echo "=== Optimization complete ==="
