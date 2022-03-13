interface Obj {
  id: number
}

export default function<T extends Obj, Y extends Obj> (primaryArray: T[], toJoinArray: Y[], name: string): any[] {
  return primaryArray.map((obj, i) => {
    const index = toJoinArray.findIndex(el => el.id === obj.id)
    const joinObj = index !== -1 ? toJoinArray[index] : {}

    obj[name] = joinObj

    return {
      ...obj

    }
  })
}
