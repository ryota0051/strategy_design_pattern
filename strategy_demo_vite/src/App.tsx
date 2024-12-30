import React, { useState } from "react";
import './App.css'

type DataModel = {
  title: string;
  detail: string;
  limitTs: number;
  createdTs: number
}

interface SortingStrategy {
  sort(data: DataModel[]): DataModel[]
}

/**
 * title昇順
 */
class TitleAscendingStrategy implements SortingStrategy {
  sort(data: DataModel[]): DataModel[] {
    return data.slice().sort((a, b) => a.title.localeCompare(b.title))
  }
}

/**
 * title降順
 */
class TitleDescendingStrategy implements SortingStrategy {
  sort(data: DataModel[]): DataModel[] {
    return data.slice().sort((a, b) => b.title.localeCompare(a.title))
  }
}

/**
 * createdTs昇順
 */
class CreatedTsAscendingStrategy implements SortingStrategy {
  sort(data: DataModel[]): DataModel[] {
    return data.slice().sort((a, b) => a.createdTs - b.createdTs)
  }
}

/**
 * createdTs降順
 */
class CreatedTsDescendingStrategy implements SortingStrategy {
  sort(data: DataModel[]): DataModel[] {
    return data.slice().sort((a, b) => b.createdTs - a.createdTs)
  }
}

/**
 * limitTs昇順
 */
class LimitTsAscendingStrategy implements SortingStrategy {
  sort(data: DataModel[]): DataModel[] {
    return data.slice().sort((a, b) => a.limitTs - b.limitTs)
  }
}

/**
 * limitTs降順
 */
class LimitTsDescendingStrategy implements SortingStrategy {
  sort(data: DataModel[]): DataModel[] {
    return data.slice().sort((a, b) => b.limitTs - a.limitTs)
  }
}


class Sorter {
  private strategy: SortingStrategy
  constructor(strategy: SortingStrategy) {
    this.strategy = strategy
  }

  public setStrategy(strategy: SortingStrategy) {
    this.strategy = strategy
  }

  public sort(data: DataModel[]): DataModel[] {
    return this.strategy.sort(data)
  }
}


function formatUnixTime(unixTime: number): string {
  // Unix時間をミリ秒に変換してDateオブジェクトを生成
  const date = new Date(unixTime * 1000);

  // 各部分を取得
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0始まりのため+1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // yyyy/mm/dd hh:mm:ss形式に整形して返す
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}


function App() {
  const initialData: DataModel[] = [
    {
      title: "牛乳買う",
      detail: "いつもの牛乳",
      limitTs: 1731304648,
      createdTs: 1730818648,
    },
    {
      title: "娘の迎え",
      detail: "なんば保育園",
      limitTs: 1731303048,
      createdTs: 1730718555, 
    },
    {
      title: "掃除する",
      detail: "トイレ, 風呂",
      limitTs: 1731400000,
      createdTs: 1730800000,
    }
  ]
  const [data] = useState<DataModel[]>(initialData)
  const [sortStrategy, setSortStrategy] = useState<SortingStrategy>(
    new TitleAscendingStrategy()
  )

    // 選択したソート手法ごとに
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value
      console.log(value)
      switch (value) {
        case "titleAsc":
          setSortStrategy(new TitleAscendingStrategy())
          break
        case "titleDesc":
          setSortStrategy(new TitleDescendingStrategy())
          break
        case "createdAsc":
          setSortStrategy(new CreatedTsAscendingStrategy())
          break
        case "createdDesc":
          setSortStrategy(new CreatedTsDescendingStrategy())
          break
        case "limitAsc":
          setSortStrategy(new LimitTsAscendingStrategy())
          break
        case "limitDesc":
          setSortStrategy(new LimitTsDescendingStrategy())
          break
        default:
          setSortStrategy(new TitleAscendingStrategy())
          break
      }
    }  

  // sorter作成
  const sorter = new Sorter(sortStrategy)

  // データソート
  const sortedData = sorter.sort(data)
  return (
    <div>
      <h1>Strategy パターン</h1>
      <div>
        <div>
          <label>ソート方法</label>
        </div>
        <div>
          <select onChange={handleSortChange} defaultValue="titleAsc">
            <option value="titleAsc">タイトル昇順</option>
            <option value="titleDesc">タイトル降順</option>
            <option value="createdAsc">作成日昇順</option>
            <option value="createdDesc">作成日降順</option>
            <option value="limitAsc">期限昇順</option>
            <option value="limitDesc">期限降順</option>
          </select>
        </div>
      </div>

      <ul style={{ marginTop: "1rem" }}>
        {sortedData.map((item, index) => (
          <li key={index} style={{ marginTop: "1rem" }}>
            <strong>{item.title}</strong> / {item.detail} <br />
            <span>作成日: {formatUnixTime(item.createdTs)}</span> /
            <span>期限: {formatUnixTime(item.limitTs)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
