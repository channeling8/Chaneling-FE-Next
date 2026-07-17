#!/bin/sh
set -eu

echo "[INFO] 배포 리포지토리 동기화 파일을 준비합니다."

rm -rf output
mkdir output

for item in *; do
  if [ "$item" != "output" ]; then
    cp -R "$item" output/
  fi
done

echo "[SUCCESS] output 폴더 생성 완료"