import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Computer, Smartphone, Mail, Wifi, HelpCircle, Printer, Search, Shield, FileText, Phone, ZoomIn, ZoomOut, Heart, Terminal, Settings, MessageSquare, Save, Users, ShoppingCart } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import QuestionForm from './QuestionForm';

interface Link {
  text: string;
  url: string;
}

interface TipStep {
  title: string;
  steps: string[];
  links: Link[];
}

interface Category {
  icon: LucideIcon;
  title: string;
  description: string;
  tips: TipStep[];
}

const categories: Category[] = [
    {
        icon: Shield,
        title: "Tietoturva",
        description: "Turvallinen internetin käyttö",
        tips: [
            {
                title: "Vahvan salasanan luominen ja säilyttäminen",
                steps: [
                    "1. Käytä vähintään 12 merkkiä.",
                    "2. Yhdistä isoja ja pieniä kirjaimia, numeroita ja erikoismerkkejä.",
                    "3. Vältä henkilökohtaisia tietoja (syntymäaika, lemmikin nimi).",
                    "4. Käytä eri salasanaa eri palveluissa.",
                    "5. Tallenna salasanat turvallisesti salasananhallintaohjelmaan."
                ],
                links: [
                    {
                        text: "Salasananhallintaohjelma LastPass",
                        url: "https://www.lastpass.com/fi"
                    },
                    {
                        text: "Kyberturvallisuuskeskuksen salasanaohje",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/salasanat-haltuun"
                    }
                ]
            },
            {
                title: "Kaksivaiheisen tunnistautumisen käyttöönotto",
                steps: [
                    "1. Mene palvelun asetuksiin.",
                    "2. Etsi 'Turvallisuus' tai 'Kaksivaiheinen tunnistautuminen'.",
                    "3. Seuraa palvelun ohjeita aktivointiin.",
                    "4. Tallenna varakoodit turvalliseen paikkaan."
                ],
                links: [
                    {
                        text: "Google-tilin kaksivaiheinen tunnistautuminen",
                        url: "https://myaccount.google.com/security"
                    }
                ]
            }
        ]
    },
    {
        icon: Shield,
        title: "Salasanat ja tunnukset",
        description: "Salasanojen ja tunnusten turvallinen hallinta",
        tips: [
            {
                title: "Salasanan palauttaminen",
                steps: [
                    "1. Etsi palvelun kirjautumissivulta 'Unohditko salasanasi?' -linkki",
                    "2. Anna sähköpostiosoitteesi tai käyttäjätunnuksesi",
                    "3. Tarkista sähköpostisi - saat linkin salasanan vaihtoon",
                    "4. Klikkaa sähköpostissa olevaa linkkiä",
                    "5. Luo uusi, turvallinen salasana",
                    "6. Jos et saa sähköpostia, tarkista roskapostikansio"
                ],
                links: [
                    {
                        text: "Turvallisen salasanan luominen",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/salasanat-haltuun"
                    }
                ]
            },
            {
                title: "Pankkitunnusten uusiminen",
                steps: [
                    "1. Jos tunnuslukukortti on kadonnut, soita pankin asiakaspalveluun",
                    "2. Varaa aika pankkiin henkilöllisyystodistuksen kanssa",
                    "3. Pankissa saat uudet tunnukset",
                    "4. Jos käytät mobiilipankkia, se pitää aktivoida uudelleen",
                    "5. Säilytä uudet tunnukset huolellisesti"
                ],
                links: [
                    {
                        text: "Pankkitunnusten käyttö",
                        url: "https://www.finanssiala.fi/pankkitunnukset/"
                    }
                ]
            },
            {
                title: "Salasanojen turvallinen säilytys",
                steps: [
                    "1. Käytä eri salasanaa joka palvelussa",
                    "2. Kirjoita salasanat muistiin vihkoon, jota säilytät turvallisessa paikassa",
                    "3. Älä säilytä salasanoja tietokoneella tekstitiedostossa",
                    "4. Älä kerro salasanojasi kenellekään",
                    "5. Voit käyttää ilmaista salasanojen hallintaohjelmaa (esim. Bitwarden)",
                    "6. Vaihda tärkeimmät salasanat säännöllisesti"
                ],
                links: [
                    {
                        text: "Salasanojen hallintaohjeet (Kyberturvallisuuskeskus)",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/salasanat-haltuun"
                    },
                    {
                        text: "Bitwarden - Ilmainen salasanojen hallinta",
                        url: "https://bitwarden.com/fi-FI/"
                    }
                ]
            },
            {
                title: "Salasanojen hallintaohjelman käyttö",
                steps: [
                    "1. Lataa Bitwarden selaimesi sovelluskaupasta",
                    "2. Luo tili vahvalla pääsalasanalla - kirjoita se muistiin!",
                    "3. Asenna Bitwarden selaimeen laajennuksena",
                    "4. Kun kirjaudut palveluihin, Bitwarden tarjoutuu tallentamaan salasanat",
                    "5. Salasanat tallentuvat turvallisesti ja automaattisesti",
                    "6. Voit käyttää samoja salasanoja kaikilla laitteillasi"
                ],
                links: [
                    {
                        text: "Bitwardenin käyttöohje suomeksi",
                        url: "https://bitwarden.com/fi-FI/help/"
                    }
                ]
            },
            {
                title: "Vahvan salasanan luominen",
                steps: [
                    "1. Käytä vähintään 12 merkkiä",
                    "2. Yhdistä 3-4 tuttua sanaa, esim. 'KissaAutoPuuTalo'",
                    "3. Lisää numeroita sanojen väliin tai loppuun",
                    "4. Käytä isoja ja pieniä kirjaimia",
                    "5. Voit käyttää erikoismerkkejä (.,!@#)",
                    "6. Vältä henkilökohtaisia tietoja (syntymäaika, nimi)"
                ],
                links: [
                    {
                        text: "Vahvan salasanan muistisäännöt",
                        url: "https://www.yksityisyydensuoja.fi/salasana"
                    }
                ]
            }
        ]
    },
    {
        icon: Computer,
        title: "Tietokoneen perusteet",
        description: "Tietokoneen, hiiren ja näppäimistön käyttö",
        tips: [
            {
                title: "Miten käynnistät ja sammutat tietokoneen turvallisesti",
                steps: [
                    "1. Paina tietokoneen virtapainiketta kerran.",
                    "2. Odota, kunnes näyttö aktivoituu.",
                    "3. Kirjaudu sisään käyttäjätilillesi.",
                    "4. Sammuttaessa: Paina Windows-painiketta ⊞.",
                    "5. Valitse virtakuvake ⏻.",
                    "6. Valitse 'Sammuta'."
                ],
                links: [
                    {
                        text: "Windows 10 käynnistysopas",
                        url: "https://support.microsoft.com/fi-fi/windows"
                    }
                ]
            },
            {
                title: "Hiiren ja näppäimistön käyttäminen",
                steps: [
                    "1. Liikuta hiirtä tasaisella alustalla.",
                    "2. Klikkaa hiiren vasenta painiketta valitaksesi kohteita.",
                    "3. Käytä näppäimistöä kirjoittamiseen.",
                    "4. Opettele yleisimmät pikanäppäimet (esim. Ctrl+C kopioi, Ctrl+V liittää)."
                ],
                links: [
                    {
                        text: "Hiiren ja näppäimistön peruskäyttö",
                        url: "https://www.digituki.fi/tietokoneen-kaytto/hiiren-ja-nappaimiston-kaytto/"
                    }
                ]
            }
        ]
    },
    {
        icon: Smartphone,
        title: "Älypuhelimet ja tabletit",
        description: "Apua mobiililaitteiden käyttöön",
        tips: [
            {
                title: "Puheluiden soittaminen ja viestien lähettäminen",
                steps: [
                    "1. Avaa puhelinsovellus.",
                    "2. Valitse yhteystieto tai näppäile puhelinnumero.",
                    "3. Paina soittopainiketta.",
                    "4. Viestin lähettämiseksi avaa viestisovellus ja kirjoita viesti."
                ],
                links: [
                    {
                        text: "Android-puhelimen käyttöohjeet",
                        url: "https://support.google.com/android/?hl=fi#topic=7313011"
                    },
                    {
                        text: "iPhone-puhelimen käyttöohjeet",
                        url: "https://support.apple.com/fi-fi/iphone"
                    }
                ]
            }
        ]
    },
    {
        icon: Mail,
        title: "Sähköposti",
        description: "Sähköpostin käyttöönotto ja käyttö",
        tips: [
            {
                title: "Sähköpostitilin luominen",
                steps: [
                    "1. Valitse sähköpostipalvelu (esim. Gmail tai Outlook)",
                    "2. Mene palvelun verkkosivulle",
                    "3. Valitse 'Luo tili' tai 'Rekisteröidy'",
                    "4. Täytä vaaditut tiedot",
                    "5. Valitse vahva salasana",
                    "6. Vahvista tili sähköpostilla tai tekstiviestillä"
                ],
                links: [
                    {
                        text: "Gmail-tilin luominen",
                        url: "https://support.google.com/mail/answer/56256?hl=fi"
                    },
                    {
                        text: "Outlook-tilin luominen",
                        url: "https://support.microsoft.com/fi-fi/account-billing/outlook-com-s%C3%A4hk%C3%B6postitilin-luominen-3aa7fee4-e111-42a9-9a09-e34a2461e5d9"
                    }
                ]
            },
            {
                title: "Sähköpostin tietoturva",
                steps: [
                    "1. Käytä vahvaa salasanaa",
                    "2. Älä avaa epäilyttäviä liitetiedostoja",
                    "3. Varo huijausviestejä",
                    "4. Kirjaudu ulos julkisilta tietokoneilta",
                    "5. Käytä kaksivaiheista tunnistautumista"
                ],
                links: [
                    {
                        text: "Kyberturvallisuuskeskuksen sähköpostiohje",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/sahkopostin-tietoturva"
                    }
                ]
            },
            {
                title: "Liitetiedostojen käsittely",
                steps: [
                    "1. Avaa vain tunnetuilta lähettäjiltä tulevia liitteitä",
                    "2. Tarkista liitetiedoston pääte (.pdf, .doc, jne.)",
                    "3. Älä avaa .exe tai muita suoritettavia tiedostoja",
                    "4. Käytä virustorjuntaohjelmaa"
                ],
                links: [
                    {
                        text: "Turvallinen liitetiedostojen käsittely",
                        url: "https://www.digituki.fi/sahkoposti/liitetiedostot/"
                    }
                ]
            }
        ]
    },
    {
        icon: Wifi,
        title: "Internet ja WiFi",
        description: "Internetin käyttö ja verkkoyhteydet",
        tips: [
            {
                title: "WiFi-verkkoon yhdistäminen",
                steps: [
                    "1. Avaa WiFi-asetukset laitteestasi",
                    "2. Valitse haluamasi verkko listasta",
                    "3. Syötä verkon salasana",
                    "4. Odota yhdistämistä",
                    "5. Varmista yhteyden toimivuus"
                ],
                links: [
                    {
                        text: "Windows 10 WiFi-ohjeet",
                        url: "https://support.microsoft.com/fi-fi/windows/yhdist%C3%A4-wifi-verkkoon-windowsissa-1f881677-b569-0cd5-010d-e3cd3579d263"
                    }
                ]
            },
            {
                title: "Turvallinen verkkopankin käyttö",
                steps: [
                    "1. Varmista että osoite alkaa https://",
                    "2. Tarkista pankin verkko-osoite",
                    "3. Käytä vain omaa laitetta ja luotettavaa verkkoa",
                    "4. Älä koskaan lähetä pankkitunnuksia sähköpostilla",
                    "5. Kirjaudu aina ulos palvelusta"
                ],
                links: [
                    {
                        text: "Finanssiala: Näin käytät verkkopankkia turvallisesti",
                        url: "https://www.finanssiala.fi/julkaisut/nain-kaytat-verkkopankkia-turvallisesti/"
                    }
                ]
            },
            {
                title: "Julkisten WiFi-verkkojen riskit",
                steps: [
                    "1. Vältä arkaluontoisten tietojen käsittelyä",
                    "2. Käytä VPN-yhteyttä jos mahdollista",
                    "3. Varmista että yhteytesi on salattu (https)",
                    "4. Älä jaa tiedostoja julkisessa verkossa",
                    "5. Poista verkko laitteesta käytön jälkeen"
                ],
                links: [
                    {
                        text: "Turvallinen julkisen WiFin käyttö",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/nain-kaytat-julkisia-wlan-verkkoja-turvallisesti"
                    }
                ]
            }
        ]
    },
    {
        icon: FileText,
        title: "Viranomaispalvelut",
        description: "Suomalaiset verkkopalvelut",
        tips: [
            {
                title: "Suomi.fi-valtuuksien käyttö",
                steps: [
                    "1. Siirry Suomi.fi-valtuudet sivulle",
                    "2. Kirjaudu sisään pankkitunnuksilla tai mobiilivarmenteella",
                    "3. Valitse 'Anna valtuus' tai 'Tarkastele valtuuksia'",
                    "4. Täytä tarvittavat tiedot",
                    "5. Vahvista valtuutus"
                ],
                links: [
                    {
                        text: "Suomi.fi-valtuudet",
                        url: "https://www.suomi.fi/valtuudet"
                    },
                    {
                        text: "Valtuuksien käyttöohje",
                        url: "https://www.suomi.fi/ohjeet-ja-tuki"
                    }
                ]
            },
            {
                title: "OmaKanta - terveystietojen hallinta",
                steps: [
                    "1. Siirry OmaKanta-palveluun",
                    "2. Kirjaudu sisään pankkitunnuksilla tai mobiilivarmenteella",
                    "3. Tarkastele omia terveystietojasi",
                    "4. Voit myös antaa suostumuksia tietojen luovuttamiseen"
                ],
                links: [
                    {
                        text: "OmaKanta",
                        url: "https://www.omakanta.fi/"
                    },
                    {
                        text: "OmaKanta - usein kysytyt kysymykset",
                        url: "https://www.kanta.fi/usein-kysyttya"
                    }
                ]
            },
            {
                title: "Kelan verkkopalvelut",
                steps: [
                    "1. Mene osoitteeseen www.kela.fi",
                    "2. Klikkaa 'Asioi verkossa'",
                    "3. Kirjaudu sisään pankkitunnuksilla tai mobiilivarmenteella",
                    "4. Valitse haluamasi palvelu (esim. tuet, hakemukset, viestit)",
                    "5. Seuraa palvelun ohjeita",
                    "6. Muista tallentaa tai tulostaa tärkeät dokumentit"
                ],
                links: [
                    {
                        text: "Kelan verkkoasiointi",
                        url: "https://www.kela.fi/asiointi"
                    },
                    {
                        text: "Kelan asiointipalvelun ohjeet",
                        url: "https://www.kela.fi/asioi-verkossa"
                    }
                ]
            },
            {
                title: "Kelan tuet ja etuudet",
                steps: [
                    "1. Tarkista oikeutesi tukiin Kelan sivuilta",
                    "2. Kerää tarvittavat liitteet valmiiksi",
                    "3. Täytä hakemus verkossa",
                    "4. Lähetä tarvittavat liitteet verkkopalvelussa",
                    "5. Seuraa hakemuksen käsittelyä asiointipalvelussa",
                    "6. Vastaa mahdollisiin lisäselvityspyyntöihin ajoissa"
                ],
                links: [
                    {
                        text: "Kelan etuudet",
                        url: "https://www.kela.fi/henkiloasiakkaat"
                    },
                    {
                        text: "Eläkeläisen tuet",
                        url: "https://www.kela.fi/elakelaiset"
                    }
                ]
            }
        ]
    },
    {
        icon: Heart,
        title: "Seniorit",
        description: "Helppokäyttöiset ohjeet ikäihmisille",
        tips: [
            {
                title: "Tekstin suurentaminen",
                steps: [
                    "1. Paina Ctrl-näppäin pohjaan (löytyy näppäimistön vasemmasta alakulmasta)",
                    "2. Pidä Ctrl pohjassa ja paina plus-merkkiä (+) suurentaaksesi tekstiä",
                    "3. Voit pienentää tekstiä painamalla Ctrl ja miinus-merkkiä (-)",
                    "4. Tekstin koko palautuu normaaliksi painamalla Ctrl ja numero 0"
                ],
                links: [
                    {
                        text: "Tietokone tutuksi - Tekstin suurentaminen",
                        url: "https://www.vtkl.fi/tietopankki/tietokone-tutuksi"
                    }
                ]
            },
            {
                title: "Hiiren käytön helpottaminen",
                steps: [
                    "1. Avaa Windowsin asetukset painamalla Windows-näppäintä",
                    "2. Kirjoita hakukenttään 'hiiri'",
                    "3. Valitse 'Hiiren asetukset'",
                    "4. Voit suurentaa hiiren osoitinta",
                    "5. Voit hidastaa hiiren nopeutta",
                    "6. Voit ottaa käyttöön automaattisen napsautuksen"
                ],
                links: [
                    {
                        text: "Hiiren asetusten muuttaminen",
                        url: "https://support.microsoft.com/fi-fi/windows/hiiren-asetusten-muuttaminen-windows-10-ssa-a74b393f-a80e-f105-4c0d-c92f1d033288"
                    }
                ]
            },
            {
                title: "Turvallinen tietokoneen käyttö",
                steps: [
                    "1. Älä koskaan anna pankkitunnuksia tai salasanoja kenellekään",
                    "2. Jos et ole varma jostain, kysy apua läheisiltä",
                    "3. Älä avaa epäilyttäviä sähköposteja tai linkkejä",
                    "4. Pidä virustorjunta päällä",
                    "5. Käytä vahvoja salasanoja ja säilytä ne turvallisesti"
                ],
                links: [
                    {
                        text: "Seniorin tietoturvaopas",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/seniorin-tietoturvaopas"
                    }
                ]
            },
            {
                title: "Videopuhelut läheisten kanssa",
                steps: [
                    "1. Valitse helppokäyttöinen sovellus (esim. WhatsApp)",
                    "2. Asenna sovellus sovelluskaupasta",
                    "3. Rekisteröidy puhelinnumerolla",
                    "4. Lisää yhteystiedot",
                    "5. Aloita videopuhelu painamalla kamerakuvaketta"
                ],
                links: [
                    {
                        text: "WhatsApp videopuheluohjeet",
                        url: "https://faq.whatsapp.com/539178204879377"
                    }
                ]
            }
        ]
    },
    {
        icon: Terminal,
        title: "Tehokäyttäjät",
        description: "Vinkkejä edistyneempään tietokoneen käyttöön",
        tips: [
            {
                title: "Pikanäppäimet Windowsissa",
                steps: [
                    "Windows + E = Avaa tiedostoselain",
                    "Windows + D = Näytä työpöytä",
                    "Windows + L = Lukitse tietokone",
                    "Windows + V = Näytä leikepöydän historia",
                    "Alt + Tab = Vaihda ohjelmien välillä",
                    "Ctrl + Shift + Esc = Avaa tehtävienhallinta"
                ],
                links: [
                    {
                        text: "Windows pikanäppäimet",
                        url: "https://support.microsoft.com/fi-fi/windows/windows-n-pikan%C3%A4pp%C3%A4imet-dcc61a57-8ff0-cffe-9796-cb9706c75eec"
                    }
                ]
            },
            {
                title: "Komentorivinkäyttö",
                steps: [
                    "1. Avaa komentokehote (cmd) järjestelmänvalvojana",
                    "2. ipconfig = Näytä verkkoasetukset",
                    "3. sfc /scannow = Tarkista järjestelmätiedostot",
                    "4. chkdsk = Tarkista kiintolevy",
                    "5. tasklist = Näytä käynnissä olevat ohjelmat"
                ],
                links: [
                    {
                        text: "Windows komentorivin perusteet",
                        url: "https://learn.microsoft.com/fi-fi/windows-server/administration/windows-commands/windows-commands"
                    }
                ]
            },
            {
                title: "Järjestelmän optimointi",
                steps: [
                    "1. Poista tarpeettomat ohjelmat",
                    "2. Tyhjennä välimuisti säännöllisesti",
                    "3. Defragmentoi kiintolevy (HDD)",
                    "4. Hallitse käynnistyksen yhteydessä avautuvat ohjelmat",
                    "5. Päivitä ajurit säännöllisesti"
                ],
                links: [
                    {
                        text: "Windows suorituskyvyn parantaminen",
                        url: "https://support.microsoft.com/fi-fi/windows/windows-10-n-suorituskyvyn-parantaminen-14e5e5c7-7fd3-4137-c6cf-c995a6c0f443"
                    }
                ]
            }
        ]
    },
    {
        icon: Smartphone,
        title: "Älypuhelin",
        description: "Älypuhelimen käyttövinkit",
        tips: [
            {
                title: "Puhelimen käyttöönotto",
                steps: [
                    "1. Aseta SIM-kortti puhelimeen",
                    "2. Käynnistä puhelin virtapainikkeesta",
                    "3. Valitse kieli (suomi)",
                    "4. Yhdistä WiFi-verkkoon",
                    "5. Kirjaudu Google- tai Apple-tilille",
                    "6. Määritä suojakoodit ja sormenjälkitunnistus"
                ],
                links: [
                    {
                        text: "Android-puhelimen käyttöönotto",
                        url: "https://support.google.com/android/answer/6088465?hl=fi"
                    }
                ]
            },
            {
                title: "Sovellusten asentaminen",
                steps: [
                    "1. Avaa Play Kauppa (Android) tai App Store (iPhone)",
                    "2. Etsi haluamasi sovellus hakutoiminnolla",
                    "3. Paina 'Asenna' tai 'Hanki'",
                    "4. Hyväksy sovelluksen tarvitsemat luvat",
                    "5. Odota asennuksen valmistumista"
                ],
                links: [
                    {
                        text: "Sovellusten asentaminen Play Kaupasta",
                        url: "https://support.google.com/googleplay/answer/113409?hl=fi"
                    }
                ]
            },
            {
                title: "Puhelimen tietoturva",
                steps: [
                    "1. Pidä käyttöjärjestelmä ajan tasalla",
                    "2. Käytä näytön lukitusta (PIN-koodi tai sormenjälki)",
                    "3. Lataa sovelluksia vain virallisista kaupoista",
                    "4. Tarkista sovellusten käyttöoikeudet",
                    "5. Varmuuskopioi tärkeät tiedot"
                ],
                links: [
                    {
                        text: "Mobiililaitteiden tietoturva",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/mobiililaitteiden-tietoturva"
                    }
                ]
            }
        ]
    },
    {
        icon: Save,
        title: "Varmuuskopiointi",
        description: "Tärkeiden tiedostojen ja kuvien varmuuskopiointi",
        tips: [
            {
                title: "Puhelimen varmuuskopiointi",
                steps: [
                    "1. Android: Avaa 'Asetukset' ja etsi 'Varmuuskopiointi'",
                    "2. iPhone: Avaa 'Asetukset' ja valitse nimesi ylhäältä -> 'iCloud'",
                    "3. Varmista että varmuuskopiointi on päällä",
                    "4. Kytke puhelin WiFi-verkkoon ja laturiin",
                    "5. Odota että varmuuskopiointi valmistuu",
                    "6. Tarkista että kuvat ja tärkeät tiedot ovat tallessa"
                ],
                links: [
                    {
                        text: "Android varmuuskopiointi",
                        url: "https://support.google.com/android/answer/2819582?hl=fi"
                    },
                    {
                        text: "iPhone varmuuskopiointi",
                        url: "https://support.apple.com/fi-fi/HT203977"
                    }
                ]
            },
            {
                title: "Tietokoneen tiedostojen varmuuskopiointi",
                steps: [
                    "1. Hanki ulkoinen kovalevy tai USB-tikku",
                    "2. Kytke laite tietokoneeseen",
                    "3. Kopioi tärkeät tiedostot (kuvat, dokumentit) laitteelle",
                    "4. Säilytä varmuuskopioita eri paikassa kuin tietokonetta",
                    "5. Päivitä varmuuskopio säännöllisesti",
                    "6. Testaa että voit avata varmuuskopioidut tiedostot"
                ],
                links: [
                    {
                        text: "Windows varmuuskopiointi",
                        url: "https://support.microsoft.com/fi-fi/windows/tiedostojen-varmuuskopiointi-windows-10-ssa-04c5f8f2-fb94-f4e6-6c5b-3243398b7f0a"
                    }
                ]
            }
        ]
    },
    {
        icon: Users,
        title: "Sosiaalinen media",
        description: "Turvallinen sosiaalisen median käyttö",
        tips: [
            {
                title: "Yksityisyysasetukset",
                steps: [
                    "1. Mene palvelun asetuksiin (usein hammasratas-kuvake)",
                    "2. Etsi 'Yksityisyys' tai 'Tietosuoja' -asetukset",
                    "3. Valitse ketkä näkevät julkaisusi (esim. vain ystävät)",
                    "4. Tarkista kuka voi ottaa sinuun yhteyttä",
                    "5. Rajoita henkilökohtaisten tietojen näkyvyyttä",
                    "6. Tallenna muutokset"
                ],
                links: [
                    {
                        text: "Facebook yksityisyysasetukset",
                        url: "https://www.facebook.com/help/325807937506242"
                    }
                ]
            },
            {
                title: "Turvallinen somekäyttö",
                steps: [
                    "1. Älä hyväksy tuntemattomia kaveripyynnöistä",
                    "2. Vältä henkilökohtaisten tietojen jakamista",
                    "3. Ole varovainen linkkien kanssa",
                    "4. Älä jaa sijaintiasi julkisesti",
                    "5. Ilmoita häiritsevästä sisällöstä ylläpidolle",
                    "6. Kirjaudu ulos julkisilta laitteilta"
                ],
                links: [
                    {
                        text: "Turvallinen sosiaalisen median käyttö",
                        url: "https://www.kyberturvallisuuskeskus.fi/fi/ajankohtaista/ohjeet-ja-oppaat/sosiaalisen-median-tietoturvaohje"
                    }
                ]
            }
        ]
    },
    {
        icon: ShoppingCart,
        title: "Verkko-ostokset",
        description: "Turvallinen verkkokauppojen käyttö",
        tips: [
            {
                title: "Turvallinen verkkokauppa",
                steps: [
                    "1. Tarkista verkkokaupan luotettavuus (esim. googletamalla kokemuksia)",
                    "2. Varmista että osoite alkaa https:// (lukko-symboli)",
                    "3. Käytä luotettavia maksutapoja (verkkopankki, luottokortti)",
                    "4. Säilytä tilausvahvistus ja kuitti",
                    "5. Älä koskaan lähetä pankkitunnuksia sähköpostilla",
                    "6. Jos epäilet huijausta, ota yhteyttä pankkiin"
                ],
                links: [
                    {
                        text: "Verkko-ostosten turvallisuus",
                        url: "https://www.kkv.fi/kuluttaja-asiat/verkkokauppa/"
                    }
                ]
            },
            {
                title: "Palautukset ja peruutukset",
                steps: [
                    "1. Tutustu palautusehtoihin ennen tilausta",
                    "2. Säilytä alkuperäispakkaus ja kuitit",
                    "3. Ilmoita palautuksesta verkkokauppaan",
                    "4. Pakkaa tuote huolellisesti",
                    "5. Säilytä lähetystunnus",
                    "6. Ota kuva tuotteesta ennen palautusta"
                ],
                links: [
                    {
                        text: "Kuluttajan oikeudet verkkokaupassa",
                        url: "https://www.kkv.fi/kuluttaja-asiat/verkkokauppa/peruuttaminen-ja-palautus/"
                    }
                ]
            }
        ]
    },
    {
        icon: Settings,
        title: "Tietokoneen ylläpito",
        description: "Tietokoneen siivous ja päivitykset",
        tips: [
            {
                title: "Tietokoneen siivous",
                steps: [
                    "1. Poista tarpeettomat ohjelmat",
                    "2. Tyhjennä roskakori",
                    "3. Poista väliaikaiset tiedostot",
                    "4. Järjestä tiedostot kansioihin",
                    "5. Tyhjennä selaimen välimuisti",
                    "6. Tarkista levytilan riittävyys"
                ],
                links: [
                    {
                        text: "Windows levytilan vapauttaminen",
                        url: "https://support.microsoft.com/fi-fi/windows/windows-10-n-levytilan-vapauttaminen-85529ccb-c365-490d-b548-831022bc9b32"
                    }
                ]
            },
            {
                title: "Päivitykset ja tietoturva",
                steps: [
                    "1. Tarkista Windows-päivitykset",
                    "2. Päivitä selain ja muut ohjelmat",
                    "3. Tarkista virustorjunnan toimivuus",
                    "4. Tee järjestelmän tarkistus",
                    "5. Varmuuskopioi tärkeät tiedostot",
                    "6. Tarkista käynnistyvät ohjelmat"
                ],
                links: [
                    {
                        text: "Windows päivitykset",
                        url: "https://support.microsoft.com/fi-fi/windows/windows-p%C3%A4ivitys-7c65d574-53b1-c559-c25e-77d1a80e2284"
                    }
                ]
            }
        ]
    }
];

const TechHelpPortal = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState(16); // Oletuskoko pikseleinä
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  // Tallennetaan fonttikoko local storageen
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
      document.documentElement.style.fontSize = `${savedFontSize}px`;
    }
  }, []);

  // Fonttikoon muuttaminen
  const changeFontSize = (delta: number) => {
    const newSize = Math.min(Math.max(fontSize + delta, 12), 24); // Min 12px, Max 24px
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize.toString());
  };

  // Hakutoiminto kategorioille ja vinkeille
  const filteredCategories = categories.filter(category => {
    const searchMatch = (
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.tips.some(tip => tip.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tietotekniikka-apu senioreille</h1>
        <p className="text-xl text-gray-700">Selkeät ohjeet tietotekniikan käyttöön</p>
        
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => changeFontSize(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            aria-label="Pienennä tekstiä"
          >
            <ZoomOut className="w-5 h-5" aria-hidden="true" />
            <span>Pienennä tekstiä</span>
          </button>
          <button
            onClick={() => changeFontSize(1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            aria-label="Suurenna tekstiä"
          >
            <ZoomIn className="w-5 h-5" aria-hidden="true" />
            <span>Suurenna tekstiä</span>
          </button>
        </div>

        <div className="max-w-xl mx-auto mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Etsi ohjeita..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Hae ohjeita"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => setSelectedCategory(category)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && setSelectedCategory(category)}
              aria-label={`Kategoria: ${category.title}`}
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
                  <category.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="mb-2">{category.title}</CardTitle>
                <p className="text-gray-700">{category.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>

        {selectedCategory && (
          <Card className="mt-8 p-6">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center" aria-hidden="true">
                  <selectedCategory.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="mb-2">{selectedCategory.title}</CardTitle>
                  <p className="text-gray-700">{selectedCategory.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-4">Yleisimmät kysymykset ja vinkit:</h3>
              <ul className="space-y-6" role="list">
                {selectedCategory.tips.map((tip, index) => (
                  <li key={index} className="space-y-3">
                    <h4 className="font-medium">{tip.title}</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="pl-4">{step}</li>
                      ))}
                    </ol>
                    {tip.links && tip.links.length > 0 && (
                      <div className="mt-3">
                        <p className="font-medium">Hyödyllisiä linkkejä:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {tip.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <a 
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline focus:ring-2 focus:ring-blue-500 rounded"
                                aria-label={`Avaa ${link.text} uudessa välilehdessä`}
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8 p-6">
          <CardHeader>
            <CardTitle>Tarvitsetko lisäapua?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Jos et löydä vastausta kysymykseesi, voit ottaa yhteyttä:</p>
              <ul className="space-y-2" role="list">
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  <span>Tukipuhelin: Tulossa (arkisin 9-16)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  <span>Sähköposti: seniorinettiapu@gmail.com</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setShowQuestionForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Kysy neuvoa</span>
          </button>
        </div>

        {showQuestionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <QuestionForm onClose={() => setShowQuestionForm(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TechHelpPortal;