export interface SceneData {
  id: number;
  title: string;
  text: string;
  image: string;
  alt: string;
}

export const introText = `Anasının vəfatından sonra Rəvan evdə illərdir əl dəymədiyi köhnə bir qutu tapdı. Qutunun içində ailə şəkilləri, anası ilə atasının gənclik fotosu, bir açar və bir neçə sənəd vardı.

Rəvan 1943-cü ildə dünyaya gəlmişdi. Atası İlqar, o hələ bir yaşında ikən müharibəyə yollanmış və geri dönməmişdi. Onu anası Gülçin böyütmüşdü.

Atasını yalnız şəkillərdən tanıyan Rəvan, həmin gün qutunun içində öz keçmişinə açılan bir qapı tapacağını bilmirdi.`;

export const finalText = `Rəvan qaranlıq kinoteatrda sakitcə oturmuşdu. Ekranda gənc Gülçinlə İlqar gülür, bir-birinə baxır, zamanın onlardan ala bilmədiyi anları yaşayırdılar.

O, atasının səsini heç vaxt evlərində eşitməmişdi. Amma indi, illər sonra, valideynlərinin birlikdə yaşadığı o kiçik xoşbəxtliyi bütün zal ilə bölüşürdü.

Bəzi hekayələr yarımçıq qalmır. Sadəcə, onları tamamlayacaq birini gözləyir.

Gülçin və İlqar Məmmədovların əziz xatirəsinə — 1940.`;

export const scenes: SceneData[] = [
  {
    id: 1,
    title: 'Köhnə qutu',
    text: 'Anasının yoxluğuna hələ alışmamış Rəvan, evin sakit bir küncündə illərdir toxunulmamış qutunu gördü. Toz basmış qapağın altında keçmişin ona deyəcəyi sözlər vardı.',
    image: '/assets/scenes/scene-01.jpg',
    alt: 'Rəvan köhnə qutunu açır',
  },
  {
    id: 2,
    title: 'Qutunun içindəkilər',
    text: 'Qutunu ehtiyatla açdı. Saralmış sənədlər, solmuş ailə şəkilləri və paslı açar sanki illərlə məhz bu anı gözləmişdi.',
    image: '/assets/scenes/scene-02.jpg',
    alt: 'Qutunun içindəki köhnə şəkillər və açar',
  },
  {
    id: 3,
    title: 'Bir foto, bir vəd',
    text: 'Valideynlərinin gənclik fotosunun arxasında bir cümlə yazılmışdı: "Yenə həmin yerdə görüşərik — 1940". Kiçik Qala küçəsi və göyərçinli qapı, itirilmiş illərə aparan ilk iz idi.',
    image: '/assets/scenes/scene-03.jpg',
    alt: 'Rəvan valideynlərinin gənclik fotosunu tutur',
  },
  {
    id: 4,
    title: 'İçərişəhərə doğru',
    text: 'Rəvan daş küçələr boyunca addımladıqca, hər döngədə atasının heç eşitmədiyi səsini axtarırdı. Bəlkə də anasının gəncliyi bu divarların yaddaşında yaşayırdı.',
    image: '/assets/scenes/scene-04.jpg',
    alt: 'Rəvan İçərişəhərin daş küçələrində gəzir',
  },
  {
    id: 5,
    title: 'Göyərçinli qapı',
    text: 'Nəhayət, qarşısında o qapı dayandı: solğun mavi taxta, illərin izləri və tanış göyərçin. Şəkildə donub qalmış bir an indi onun qarşısında idi.',
    image: '/assets/scenes/scene-05.jpg',
    alt: 'Rəvan göyərçinli qapının qarşısında dayanıb',
  },
  {
    id: 6,
    title: 'Açarın sirri',
    text: 'Qutudan çıxan paslı açarı kilidə saldı. Açar çevriləndə eşidilən səs sanki uzun illərin susqunluğunu pozdu.',
    image: '/assets/scenes/scene-06.jpg',
    alt: 'Paslı açar paslı kilidə salınır',
  },
  {
    id: 7,
    title: 'Unudulmuş otaq',
    text: 'Qapının arxasında tozlu bir otaq vardı. Köhnə kinoproyektorun yanında saxlanmış kino lenti iki insanın zamanla itməmiş xatirəsini qoruyurdu.',
    image: '/assets/scenes/scene-07.jpg',
    alt: 'Rəvan tozlu otaqda köhnə kinoproyektoru tapır',
  },
  {
    id: 8,
    title: 'Canlanan xatirələr',
    text: 'Proyektorun işığı divara düşəndə Gülçinlə İlqar yenidən gülümsədilər. Rəvan atasını ilk dəfə bir foto deyil, yaşayan bir xatirə kimi gördü.',
    image: '/assets/scenes/scene-08.jpg',
    alt: 'Proyektor divara Gülçin və İlqarın görüntüsünü göstərir',
  },
  {
    id: 10,
    title: 'Beş il sonra',
    text: 'Beş il keçdi. Zaman köhnə kinolentin izlərini silməsin deyə Rəvan xatirələri yenidən işığa qaytarmaq üçün çalışdı.',
    image: '/assets/scenes/scene-10.jpg',
    alt: '5 il sonra yazısı ilə göyərçinli qapı',
  },
  {
    id: 9,
    title: 'Səssiz qərar',
    text: 'Film bitdi, amma Rəvan yerindən qalxmadı. Bu gülüşləri, bu baxışları yalnız özü üçün saxlamaq istəmirdi.',
    image: '/assets/scenes/scene-09.jpg',
    alt: 'Rəvan kinoteatrda oturub',
  },
  {
    id: 11,
    title: 'İşığa çıxan hekayə',
    text: 'Nəhayət, qaranlıq kinoteatrda ekran işıqlandı. Rəvanın illərdir qoruduğu xatirələr artıq başqalarının da qəlbinə toxunurdu.',
    image: '/assets/scenes/scene-11.jpg',
    alt: 'Kinoteatr ekranında Gülçin və İlqar',
  },
  {
    id: 12,
    title: 'Ölümsüz xatirə',
    text: 'Gülçinlə İlqarın gəncliyi yenidən ekranda canlandı. Rəvan anladı ki, sevgi bəzən bir insanın ömründən daha uzun yaşayır.',
    image: '/assets/scenes/scene-12.jpg',
    alt: 'Gülçin və İlqar Məmmədovların xatirəsinə həsr olunmuş ekran',
  },
];
