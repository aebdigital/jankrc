export const site = {
  name: "Ján KRČ s.r.o.",
  email: "krc@jankrc.sk",
  phone: "+421 905 947 498",
  phoneTel: "+421905947498",
  address: {
    street: "Turá Lúka 285",
    cityZip: "907 03 Myjava",
    country: "Slovenská republika",
  },
  ico: "50 964 798",
  dic: "2120538783",
  icDph: "SK2120538783",
  registry:
    "Spoločnosť zapísaná v Obchodnom registri Okresného súdu Trenčín, oddiel: Sro, vložka č. 34912/R",
  bank: {
    name: "ČSOB Myjava",
    iban: "SK74 7500 0000 0040 2474 7449",
  },
} as const;

export const nav = [
  { href: "/", label: "Domov" },
  { href: "/referencie", label: "Referencie" },
] as const;
