[![pl](https://img.shields.io/badge/lang-pl-red.svg)](https://github.com/HubertCzader/HidingInformationInText/blob/main/README.md)
[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/HubertCzader/HidingInformationInText/blob/main/README.en.md)

# Ukrywanie informacji w tekście
Projekt z przedmiotu Staganografia na kierunku Informatyka Akademii Górniczo-Hutniczej w Krakowie, dotyczący ukrywania informacji w tekście.

## Autorzy
- Hubert Czader ([@HubertCzader](https://github.com/HubertCzader))
- Mateusz Zalewski ([@a-float](https://github.com/a-float?tab=following))

## Spis treści:
1. [Wstęp](#1-wstęp)
2. [Aktualny stan wiedzy](#2-aktualny-stan-wiedzy)
3. [Bibliografia](#3-bibliografia)

## 1. Wstęp

Celem projektu jest opracowanie aplikacji desktopowej umożliwiającej ukrywanie znaków w tekście za pomocą steganografii, wykorzystującej techniki takie jak pisanie znaków w kolorze identycznym z tłem dokumentu oraz modyfikację kompozycji tekstu. Aplikacja będzie oferować prosty i intuicyjny interfejs użytkownika, umożliwiający łatwe ukrywanie informacji w tekście oraz ich późniejsze odzyskiwanie. Dodatkowo, projekt zakłada ewentualne rozszerzenie funkcjonalności aplikacji o dodatkowe metody steganografii, co pozwoli na zwiększenie jej wszechstronności i możliwości zastosowania w różnych kontekstach.

## 2. Aktualny stan wiedzy

Steganografia jest metodą utajniania informacji w sposób, który maskuje ich obecność przed nieuprawnionymi obserwatorami. Proces ten obejmuje umieszczanie danych w nośnikach, takich jak obrazy, dźwięki czy teksty, przy minimalnym wpływie na percepcję nośnika przez osoby nieświadome istnienia ukrytych treści. Odbiorca może później identyfikować i odzyskiwać zakamuflowane dane przy użyciu dedykowanych narzędzi lub algorytmów steganograficznych. Steganografia znajduje zastosowanie w rozmaitych dziedzinach, w tym w dziedzinie bezpieczeństwa informacji oraz kryptografii. W ramach projektu skupiono się jedynie na dziedzinie steganografii zajmującej się ukrywaniem informacji w tekście.

Poniżej przedstawione są najpowszechniej stosowane metody ukrywania danych w tekście.

### Metoda semantyczna
Metoda semantyczna polega na zmienianiu znaczenia słów w tekście w celu ukrycia wiadomości. Wykorzystuje synonimy, które posiadają to samo znaczenie, co pozwala skuteczniej ukryć informację. Poprzez wykorzystanie zarówno głównych, jak i drugorzędnych znaczeń słów, można ukryć wiadomość w tekście. Ta metoda oferuje wysoki poziom zabezpieczeń, ponieważ nawet techniki optycznego rozpoznawania znaków (OCR) nie są w stanie wykryć ukrytej wiadomości. 

### Metoda składniowa
Metoda składniowa polega na modyfikowaniu składni tekstu, poprzez dodawanie znaków interpunkcyjnych lub stosowanie innych zapisów wyrazów. Przykładowo, przecinek lub kropka mogą być używane do ukrycia poufnej informacji. Innym przykładem może być różnica w zapisie słów pomiędzy amerykańskim a brytyjskim angielskim. Wykorzystanie tych języków zwiększa skuteczność tworzenia obiektu steganograficznego, ponieważ szansa wykrycia ukrytej wiadomości przez atakującego jest minimalna. 

### Kodowanie cech
Kodowanie cech to proces modyfikowania różnych właściwości tekstu, takich jak wysokość, kolor lub czcionka, w taki sposób, aby ukryć w nim znaczącą wiadomość. Utworzony w ten sposób tekst nazywa się tekstem osłonowym, czyli tekstem będącym nośnikiem sekretnej informacji. Metoda ta polega więc na wykorzystywaniu specyficznych atrybutów lub struktur tekstu do ukrywania dodatkowej informacji. Ukryta wiadomość jest wykrywana jedynie przez nadawcę i zamierzonego odbiorcę po zmianie cech tekstu, a osoba trzecia nie jest w w stanie niczego wykryć wewnątrz tekstu.

### Steganografia tekstu w losowych sekwencjach znaków i słów
Metoda steganografii opierająca się na losowych sekwencjach znaków i słów na na celu ukrycie wiadomości na przypadkowych miejscach w tekście. Wprowadza różne sekwencje słów i znaków na tych losowo wybranych miejscach. Jednakże ta metoda nie jest odpowiednia, ponieważ łatwo przyciąga uwagę osób trzecich, co może prowadzić do jej odczytania jako formy szyfrowania, a nie steganografii.

### Steganografia opierająca się na konkretnych znakach w słowach
Metoda ta polega na wyborze określonych znaków z pewnych słów, aby ukryć znaczącą wiadomość. Metoda ta wymaga silnych umiejętności obliczeniowych umysłu w celu ukrycia komunikatu w taki sposób, że odbiorca nie zauważy ukrytej treści. Istnieje ograniczona liczba języków, które wspierają tę technikę, gdyż znaki słów tylko w niektórych językach mogą być użyte do ukrywania wiadomości. 

### Sekwencja słów
Metoda sekwencji słów w steganografii polega na ukrywaniu tajnych informacji w tekście, poprzez umieszczanie ich w odpowiednio dobranych sekwencjach słów, które na pierwszy rzut oka wyglądają na naturalne lub przypadkowe. Ogólna idea polega na zakodowaniu tajnej wiadomości w pewnych właściwościach tekstu, często używając rzeczywistych elementów detekcji do zakodowania jednego lub więcej bitów informacji na słowo. Mapowanie pomiędzy sekwencjami leksykalnymi a sekwencjami bitów może wymagać użycia księgi kodowej. Wynika to z faktu, że bity w tekście są używane do zakodowania leksykalnej wiadomości. 

### Sekwencja znaków
Metoda sekwencji znaków w steganografii tekstowej wykorzystuje właściwości długości słowa oraz częstości występowania liter w języku, aby generować słowa do ukrycia. Dzięki temu uzyskuje się tekst, który ma takie same właściwości statystyczne jak rzeczywiste słowa w danym języku. Dzięki temu uzyskuje się tekst, który ma takie same właściwości statystyczne jak rzeczywiste słowa w danym języku.

### Znaki białe
W tekście można wkomponować wiele białych znaków, które spełniają rolę nośnika ukrytej informacji. Mogą one zostać umieszczone zarówno na początku, jak i na końcu linii, a także na początku lub na końcu akapitu. Ponadto, wewnętrzne obszary tekstu również mogą być wykorzystane do zakamuflowania wiadomości. Zastosowanie białych znaków stanowi efektywny środek do utrudnienia dostępu do zawartych danych. Niemniej jednak, jeżeli edytory tekstu zostaną użyte w celu eliminacji tych znaków, integralność tekstu zostanie nadszarpnięta.

### Przesuwanie słów
Metoda opiera się na dokonywaniu poziomych przesunięć słów w tekście, w celu maskowania znaczącej wiadomości. Odległość między poszczególnymi słowami jest dostosowywana w sposób, który pozwala na ukrycie informacji. Wewnętrzne odstępy w obrębie słów powinny być różne, aby wygenerować tekst osłonowy. Odbiorca musi także posiadać informację dotyczącą przesunięcia słów, aby wydobyć ukrytą wiadomość za pomocą steganografii. Jeśli w metodzie przesuwania słów istnieją różne możliwości miejsc, to dekoder powinien otrzymać oryginalny tekst, aby możliwe było wykrycie prawidłowej informacji po stronie dekodera. 

### Przesuwanie linii
Metoda przesuwania linii służy do modyfikowania tekstu poprzez przesuwanie linii w pionie. Przesuwanie linii prowadzi do powstania określonego wzoru w tekście, który jest wykorzystywany do generowania tekstu osłonowego. Przesunięcie jest realizowane poprzez przesunięcie linii tekstu o określony stopień w kierunku pionowym. 

### Skróty
Generowanie skrótów w tekście polega na zastępowaniu wyrazów lub fraz słowem skróconym, co skutkuje zmniejszeniem tekstu i ukryciem informacji. Skróty mogą być wykorzystane do ukrycia wiadomości, ponieważ wiele słów może zostać zastąpionych jednym skrótem, co tworzy inną interpretację tekstu i pomaga w generowaniu tekstu osłonowego. Zamierzony odbiorca powinien znać skróty używane przez nadawcę, a potencjalny atakujący może nie wykryć tekstu osłonowego. 

## 3. Bibliografia
###### [1] https://www.researchgate.net/profile/Anirudra-Diwakar/publication/371286387_A_Novel_Approach_to_Text_Steganography/links/647cad9f79a72237650da99b/A-Novel-Approach-to-Text-Steganography.pdf
###### [2] https://sci-hub.se/10.1016/j.protcy.2013.12.343

