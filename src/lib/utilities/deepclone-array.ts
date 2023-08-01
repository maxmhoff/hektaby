function deepCloneArray<T>(arr: T[]): T[] {
	return arr.map((item) => ({ ...item }));
}

export default deepCloneArray;