#!/bin/bash

# 檢查是否有輸入 commit 訊息
if [ -z "$1" ]; then
  echo "❌ 請輸入 commit 訊息，如：./push.sh \"完成登入頁面\""
  exit 1
fi

# 執行 Git 三步驟
echo "🔍 加入所有變更..."
git add .

echo "📝 提交 commit：$1"
git commit -m "$1"

echo "🚀 推送到 GitHub..."
git push

echo "✅ 已成功上傳！"
