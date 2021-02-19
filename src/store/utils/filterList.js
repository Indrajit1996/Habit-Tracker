export const filterList = (collection, value) => {
  let result = collection.filter(function(item) {
    for (var i = 0, len = value.length; i < len; i++) {
      if (value[i].id === item.id) {
        return false;
      }
    }
    return true;
  });
  return result;
}