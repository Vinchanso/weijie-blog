#!/bin/bash
# 双语完整性验证脚本
# 检查 src/content/zh/posts/ 和 src/content/en/posts/ 的文件是否一一对应

ZH_DIR="src/content/zh/posts"
EN_DIR="src/content/en/posts"

echo "=== 双语完整性检查 ==="
echo ""

ZH_FILES=$(ls "$ZH_DIR" 2>/dev/null | sort)
EN_FILES=$(ls "$EN_DIR" 2>/dev/null | sort)

ZH_COUNT=$(echo "$ZH_FILES" | grep -c . 2>/dev/null || echo 0)
EN_COUNT=$(echo "$EN_FILES" | grep -c . 2>/dev/null || echo 0)

echo "中文文章: $ZH_COUNT 篇"
echo "英文文章: $EN_COUNT 篇"
echo ""

# 检查中文有但英文没有的
MISSING_EN=$(comm -23 <(echo "$ZH_FILES") <(echo "$EN_FILES"))
if [ -n "$MISSING_EN" ]; then
  echo "❌ 以下中文文章缺少英文翻译:"
  echo "$MISSING_EN" | sed 's/^/   - /'
fi

# 检查英文有但中文没有的
MISSING_ZH=$(comm -13 <(echo "$ZH_FILES") <(echo "$EN_FILES"))
if [ -n "$MISSING_ZH" ]; then
  echo "❌ 以下英文文章缺少中文版本:"
  echo "$MISSING_ZH" | sed 's/^/   - /'
fi

if [ -z "$MISSING_EN" ] && [ -z "$MISSING_ZH" ]; then
  echo "✅ 双语完整性检查通过：$ZH_COUNT 篇文章全部有中英文对应版本"
  exit 0
else
  echo ""
  echo "⚠️  双语不完整，请补齐缺失的翻译后再提交"
  exit 1
fi
