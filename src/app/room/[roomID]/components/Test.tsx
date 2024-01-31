const Test = () => {
  console.log('Test rendered')
  return (
    <div className="relative rounded-lg bg-[#ffffff68] p-2 shadow-[0_0px_13px_0px_rgba(0,0,0,0.4)] ">
      <div className="w-full rounded-md bg-white">
        <canvas
          id="mainCanvas"
          width={600}
          height={600}
          className="rounded-lg"
        />
        <div className="absolute left-0 top-0 p-2">
          <canvas
            id="draftCanvas"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Test
