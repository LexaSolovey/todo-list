export default function chekOnVisibleCategory(categories, categoryId, tasks) {
  const tasksofCurrentCategory = (selectedCategory) => (
    tasks.filter(({ parentId }) => parentId.includes(selectedCategory.id))
  ); 
  const currentCategory = categories.find(({ id }) => id === categoryId);
  const categoriesInBranch = categories.filter(({ id }) => id.includes(categoryId));
  const complitedTasksInBranch = tasksofCurrentCategory(currentCategory).every(({ done }) => !!done);
  const haveEmptyCategoryInBranch = categoriesInBranch.some(category => (
    category.nestedCats.length === 0 && tasksofCurrentCategory(category).length === 0
  ));
  if((currentCategory.nestedCats.length === 0 && tasksofCurrentCategory(currentCategory).length === 0)
      || haveEmptyCategoryInBranch
      || !complitedTasksInBranch) {
    return true;
  } else if (currentCategory.done) return false;
}
