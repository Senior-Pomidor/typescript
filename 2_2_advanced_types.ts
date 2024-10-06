// HACK: Void - пустота (тлько в TS)
// не то же самое, что и null | undefined

// XXX: все return values будут проигнорированы
const logIdVoid = (id: string | number): void => {
    console.log(1)
    // В TS не вернёт ничего
    // return 1 - в TS проигнорируется
}

const logIdValue = logIdVoid(1); // logIdValue - void

type voidFn = () => void

// XXX: если есть хоть 1 return,
// по умолчанию return type будет !void    // ): number | undefined => {
// можно вручную дотипизировать void  // ): number | void => {
const logIdVoidUdefined = (id: string | number) => {
    if (typeof id === 'number') {
        return id
    }
}
