// Generates a random name using prefix and suffix, ensures length 4-5
export function generateName(existingNames = []) {
  const prefixes = [
    "No", "Lu", "Ve", "Ly", "Or", "Xa", "Ne", "Ta", "Ci", "Er",
    "Ay", "So", "Zi", "Kr", "Ym", "Ir", "Co", "Na", "Ed", "Li",
    "Ax", "Vi", "Mi", "Ar", "Ze", "Th", "Od", "Ra", "Ky", "Vo",
  ];
  
  const suffixes = [
    "va", "ra", "ga", "ra", "in", "ra", "ro", "us", "el", "yn",
    "ra", "na", "la", "on", "is", "or", "an", "el", "ar", "os",
    "en", "ia", "ra", "os", "or", "as", "is", "os", "um", "ar",
  ];
  
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let tries = 0;
  let name = "";
  
  do {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    name = prefix + suffix;
    
    if (name.length > 5) {
      name = name.slice(0, 5);
    }
    if (name.length < 4) {
      name += letters[Math.floor(Math.random() * letters.length)];
    }
    tries++;
    // Safety: avoid infinite loop
    if (tries > 50) break;
  } while (existingNames.includes(name));
  
  return name;
}
