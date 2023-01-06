
function countSpecialWords(string) {
    const regex = /[^\w\s]/g;
    const matches = string.match(regex);
    if (matches) {
        return matches.length;
    }
    return 0;
}


const string1 = "Saat meng*ecat tembok, Agung dib_antu oleh Raihan.";
const string2 = "Berapa u(mur minimal[ untuk !mengurus ktp?";
const string3 = "Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.";
const string4 = "Kemarin Shopia per[gi ke mall.";
console.log(countSpecialWords(string4));