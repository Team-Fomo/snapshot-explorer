export const cutAdddress = (addess: string) => {
  const array = addess.split('');
  return `${array.slice(0, 6).join('')}...${array.slice(array.length - 4).join('')}`
}