export const helpWhiteText = `Widok można podzielić na dwie główne częśći. Po lewej stronie znajduje się panel kontrolny. Umożliwia on wybranie metody w oknie \"Current
method"\. Dla tak wybranej metody dostęnych jest szereg parametrów umożlwiająch konfigurację metody. Dla metody \"White text in pdf\" parametry Red, Green i Blue pozwalają 
na dostosowanie koloru czcionki, poprzez wprowadzenie odpowiednich wartości z gammy RGB. Należy jednak wspomnieć, iż dobrany kolor powinien być zgodny z kolorem tła, aby 
był on niewykrywalny. Domyślnie jest wybrany kolor biały. W dalszej części, parametr FontSize umożliwia wybranie czcionki, w jakiej będzie ukryty tekst. Ostatnim polem 
umożlwiiającym dostosowanie działanie algorytmu \"White text in pdf\" jest pole hash, które to umożlwia wproadzenie ciągu znaków, które to pozwoli odróżnić ukryty tekst 
od rzeczywistego. Ukrywana wiadomość będzie poprzedzona i zakończona owym hashem. <br><br>

Część główna podzieloona jest na 3 zakładki. Pierwsza z nich oferuje szereg funckjonalności związancych z szyfrowaniem wiaodmości. Widok ten pozwala na skorzystanie z
gotowego już pliku pdf poprzez jego zaimportowanie przyciskiem \"Choose source file\".  Następnie po wybraniu pliku odblokuje się przycisk \"Encode\". Po jego wciśnięciu,
wpisana wiadomość w polu tekstowym zostanie ukryta, a oczom ukaże się plik z zaszyfrowaną wiadomością, który to można pobrać wybierając przycisk \"Download\". Możliwe jest 
również zastąpienie gotowego pliku nowoutworzonym, poprzez wybranie opcji "Use plaintext source". Wówczas w miejscu importu pliku pojawi się pole tekstowym, umożlwiające 
wpisanie tekstu, który znajdzie się w wynikowym pliku w widocznej formie dla odbiorcy (nie jest to ukrywana wiadomość). Pozostałe kroki pozostają niezmienne.
Druga zakładka odpowiedzialna jest za deszyfrowanie wiadomości. W tym widoku należy wybrać zaszyfrowany plik, a następnie nacisnąć przycisk \"Decode\". Wówczas na ekranie 
wyświetli się odszyfrowana wiadomość. <br><br>

Ostatnią zakładką jest zakładka \"Help"\. Jej funkcjonalność miałeś/aś okazję już poznać :).`;
