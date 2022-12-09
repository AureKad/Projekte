from datetime import datetime
import itertools
def exam_countdown(zeit):
    # Den String in eine Liste von Ints zerteilen in dem Format [Jahr, Monat, Tag, Stunden, Minuten]
    epi = "2023/02/16 10:00"
    epi_list = epi.split("/") 
    epi_list = stringSplit(epi_list," ")
    epi_list = stringSplit(epi_list,":")
    epi = [int(i) for i in epi_list]
    zeit_list = zeit.split("/")
    zeit_list = stringSplit(zeit_list," ")
    zeit_list = stringSplit(zeit_list,":")
    zeit = [int(i) for i in zeit_list]
    months = [31,28,31,30,31,30,31,31,30,31,30,31]

    time = list(zip(zeit,epi)) # Tupel-Liste [(Input Jahr, EPI Jahr), (Input Monat, EPI Monat), ...]

    minutes = 0
    minutes += time[4][1]-time[4][0] # Minuten Differenz berechnen
    minutes += 60*(time[3][1]-time[3][0]) # Stunden Differenz berechnen
    #Monats Differenz berechnen
    if (time[1][1]<time[1][0]): #Der Fall wenn Klausur Termin vor dem eingegeben Monat stattfindet 
        minutes -= 60*24*(time[2][0])
        minutes -= 60*24*(months[time[1][1]-1]-time[2][1])
        for i in range(time[1][1],time[1][0]-1):
            minutes -= 60*24*months[i]
    elif (time[1][1]>time[1][0]): # Wenn Klausur nach dem eingegeben Monat stattfindet
        minutes += 60*24*(months[time[1][0]-1]-time[2][0])
        minutes += 60*24*(time[2][1])
        for i in range(time[1][0],time[1][1]-1):
            print(i)
            minutes += 60*24*months[i]
    else: # Wenn es derselbe Monat ist
        minutes += 60*24*(time[2][1]-time[2][0])
    minutes += 60*24*365*(time[0][1]-time[0][0])

    for i in range(time[0][0],time[0][1]): #Schaltjahre miteinberechnen
        if i%4==0:
            minutes += 60*24
    if time[0][1]%4==0 and time[1][1]>2: #Wenn die Klausur in einem Schaltjahr geschrieben wird und der Monat nach Februar kommt
        minutes +=60*24 

    # Minuten in Stunden und Tage Überführen
    hours = int(minutes/60)
    minutes = minutes%60
    days = int(hours/24)
    hours = hours%24

    print(f"EPI: {epi} \nNOW: {zeit}")
    print(f"Minutes: {minutes}\nHours: {hours}\nDays: {days}")

def stringSplit(txt_list, character): #Splittet alle Elemente einer String Liste mit dem character
    for i, _ in enumerate(txt_list):
        txt_list[i] = str(txt_list[i]).split(character) 
    return list(itertools.chain(*txt_list))

now = datetime.now()
dt_string = now.strftime("%Y/%m/%d %H:%M")
dt = "2023/11/21 10:00"
exam_countdown(dt_string)




import random

def password_gen(length):
    pw = ""
    for _ in range(length):
        available_char_num = random.randint(0, 60)
        if available_char_num >= 0 and available_char_num <= 8:
            pw += str(available_char_num + 1)
        elif available_char_num >= 9 and available_char_num <= 34:
            pw += chr(available_char_num + 97-9)
        else:
            pw += chr(available_char_num + 65-35)
    return pw

print(password_gen(20))

def decimal_to_binary(dec):
    bin = ""
    while int(dec/2)!=0:
        bin += str(dec%2)
        dec = int(dec/2)
        print(bin[::-1])
    print("1" + bin[::-1])
    return "1"+ bin[::-1]
decimal_to_binary(2000)