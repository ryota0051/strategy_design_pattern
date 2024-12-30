## 前提条件

dockerがインストールされていること

## 起動方法

1. `docker compose build` でDocker imageを作成

2. `docker compose up` で開発用サーバを立てる

3. `http://localhost:3000/`にアクセス

4. ソート方法を変えると選択したソート方法が適用されてデータが表示される。

## タスク

Backendから返却される値を並び変える方法をstrategyデザインパターンで実装する

### 並び替え方法
- titleの昇順
- titleの降順
- createTsの昇順
- createTsの降順
- LimitTsの昇順
- LimitTsの降順

### Backendから返却される項目情報

| 論理名 | 物理名 | 型 | 備考 |
| ---- | ---- | ---- | ---- |
| 項目 | title | string | -- |
| 詳細 | detail | string | -- |
| 期限 | limitTs | int | Unixtime |
| 作成日 | createdTs | int | Unixtime |


### Backendから返される返却例

```json
[
    {
        "title": "牛乳買う",
        "detail": "いつものやつ",
        "limitTs": 1731304648,
        "createdTs": 1730818648
    },
    {
        "title": "娘の迎え",
        "detail": "なんば保育園",
        "limitTs": 1731303048,
        "createTs": 1730718555
    }
]
```
