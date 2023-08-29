const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const filteredFifa = fifaData.filter((mac) => {
    return mac.Year === 2014 && mac.Stage === "Final";
});
 
  
  const fin2014Obj = filteredFifa[0];
  
  
  
  const fHomeTeam = fin2014Obj["Home Team Name"];
  console.log("G1 a", fHomeTeam);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const fAwayTeam = fin2014Obj["Away Team Name"];
console.log("G1 b", fAwayTeam);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const fHomeGoals = fin2014Obj["Home Team Goals"];
console.log("G1 c", fHomeGoals);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const fAwayGoals = fin2014Obj["Away Team Goals"];
console.log("G1 d", fAwayGoals);
//(e) 2014 Dünya kupası finali kazananı*/
const fWinconditions = fHomeGoals > fAwayGoals ? fHomeTeam : fAwayTeam;

console.log("G1 e", fWinconditions);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(birDizi) {
	const finalMaclari = birDizi.filter((mac) => mac.Stage === "Final");
	/* kodlar buraya */
	return finalMaclari;
  }
  
  console.log("G2", Finaller(fifaData));



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(birDizi, birFonksiyon) {
	const finalMaclariDizisi = birFonksiyon(birDizi);
  
	/* const yillar = [];
	for (let i = 0; i < finalMaclariDizisi.length; i++) {
	  yillarBos.push(finalMaclariDizisi[i].Year);
	} 
	*/
	const yillar = finalMaclariDizisi.map((mac) => mac.Year);
  
	return yillar;
  }
  
  console.log("G3", Yillar(fifaData, Finaller));


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(birDizi, birFonksiyon) {
	const finalMaclariDizisi = birFonksiyon(birDizi);
  
	const kazananlar = finalMaclariDizisi.map((mac) => {
	  if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
		return mac["Home Team Name"];
	  } else {
		return mac["Away Team Name"];
	  }
	});
  
	return kazananlar;
  }
  
  console.log("G4", Kazananlar(fifaData, Finaller));



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(birDizi, cbFinaller, cbYillar, cbKazananlar) {
	const finalMaclariDizisi = cbFinaller(birDizi);
  
	const yillar = cbYillar(finalMaclariDizisi, cbFinaller);
	const kazananlar = cbKazananlar(finalMaclariDizisi, cbFinaller);
  
	const yillaraGoreKazananlar = yillar.map((yil, index) => {
	  return `${yil} yılında, ${kazananlar[index]} dünya kupasını kazandı!`;
	});
  
	/* kodlar buraya */
	return yillaraGoreKazananlar;
  }
  
  console.log(
	"G5",
	YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
  );
  


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(birFn) {
	const finalMaclariDizisi = birFn;
	const toplamGolSayisi = finalMaclariDizisi.reduce((acc, mac) => {
	  console.log(
		"acc",
		acc,
		"a",
		mac["Away Team Goals"],
		"h",
		mac["Home Team Goals"]
	  );
	  return acc + mac["Home Team Goals"] + mac["Away Team Goals"];
	}, 0);
	// initial değeri belirtmek çok önemli yoksa obj + number yapmaya çalışır
  
	const ortalamaGolSayisi = toplamGolSayisi / finalMaclariDizisi.length;
  
	return ortalamaGolSayisi.toFixed(2);
  }
  console.log("G6", OrtalamaGolSayisi(Finaller(fifaData)));



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
