export function createLookupMap(data, keyField = "name") {
  return new Map(
    data.map((item) => [item[keyField], item])
  );
}