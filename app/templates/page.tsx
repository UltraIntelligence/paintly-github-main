import data from "../today/data.json"

export default function Page() {
  return (
    <div>
      <h1>Today's Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
