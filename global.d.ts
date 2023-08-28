declare type Optional<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
declare type Override<T, R> = Omit<T, keyof R> & R
