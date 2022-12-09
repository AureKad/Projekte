def friday_13th(schaltjahr):
    monat_tage = [31,28+schaltjahr,31,30,31,30,31,31,30,31,30,31]
    liste_wochentag_f13 = []
    for i in range(7):
        wochentag = i
        freitag_13 = 0
        for monat in monat_tage:
            wochentag = (wochentag + 13)%7
            if wochentag==4:
                freitag_13 +=1
            wochentag = (wochentag + monat)%7
        liste_wochentag_f13.append(freitag_13)
    print(liste_wochentag_f13)
    return min(liste_wochentag_f13), max(liste_wochentag_f13)

schaltjahr_berechnen = input("Soll die min/max Anzahl an Freitag den Dreizehnten berechnet werden in einem Schaltjahr? (y/n) ")
if (schaltjahr_berechnen=="y"):
    min_f13, max_f13 = friday_13th(1)
    print("Min Anzahl an F13 in einem Schaltjahr:", min_f13)
    print("Max Anzahl an F13 in einem Schaltjahr:", max_f13)
else:
    min_f13, max_f13 = friday_13th(0)
    print("Min Anzahl an F13 in keinem Schaltjahr:", min_f13)
    print("Max Anzahl an F13 in keinem Schaltjahr:", max_f13)
