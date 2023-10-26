function capitalize(value: string): string {
  if (value.length < 1)
    return value;
  return value[0].toUpperCase() + value.slice(1);
}

export {capitalize};
