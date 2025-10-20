/*

    
Poznámky k projektu:
Frontend – co dělá

1.Výběr tématu

  Uživatel si může vybrat téma (např. sčítání do 20, odčítání do 20, násobení).

  Podle vybraného tématu se generují náhodné matematické příklady.

2.Procvičování příkladů

  Zobrazuje se aktuální příklad a input pro zadání odpovědi.

  Po odeslání odpovědi:

    Správná odpověď → přičtou se body a peníze.

    Špatná odpověď → odečtou se body, peníze zůstávají.

  Po 20 vyřešených příkladech se zeptá, zda chce uživatel pokračovat.

  Aktuální příklad se zachovává při přechodu na stránku teorie a zpět.

3.Teorie k tématu

  Uživatel může kdykoli přejít na stránku teorie.

  Text teorie se načítá z backendu podle topicId.

  Po návratu z teorie je stále zobrazen stejný příklad.

4.Uživatelský stav

  Body a peníze jsou zobrazeny a aktualizovány podle odpovědí.

  Stav se ukládá do localStorage pro zachování aktuálního příkladu.

5.UI komponenty

  Select pro výběr tématu.

  Zobrazení bodů a peněz.

  Otázka + input pro odpověď.

  Tlačítka: Odeslat odpověď, Nový příklad, Přejít na teorii.
    


Backend – co je potřeba zajistit

  Backend slouží pouze pro persistentní data a texty teorie, příklady se generují frontendem.

Požadované endpointy:

  GET /api/user

    Vrací JSON s aktuálním stavem uživatele:

    { "id": "123", "points": 50, "money": 20 }


  POST /api/user

    Aktualizuje body a peníze uživatele:

    { "id": "123", "points": 60, "money": 25 }


  GET /api/theory?topicId=X

    Vrací text teorie pro konkrétní téma:

    { "topicId": 1, "content": "Sčítání do 20: sčítáme dvě čísla dohromady..." }

Logika backendu:

  Ukládat a načítat stav uživatele (body, peníze).

  Poskytovat texty teorie pro jednotlivá témata podle topicId.

  Backend negeneruje příklady, to řeší frontend.



Shrnutí spolupráce frontend ↔ backend

  Frontend: generuje příklady, vyhodnocuje odpovědi, aktualizuje stav uživatele, umožňuje prohlížet teorii.

  Backend: uchovává persistentní data (body a peníze) a poskytuje texty teorie.

  Komunikace: přes API volání GET a POST ve frontendových funkcích backendCalls.getUserData(), backendCalls.updateUserData(), backendCalls.fetchTheory().

Takhe jsem to nějak myslel frontend by měl být funkční. Potřeba dodélat backend... Zatím voláme přes backendCalls!

*/