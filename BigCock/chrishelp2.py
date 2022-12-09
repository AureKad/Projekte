def streichholzspiel():
    streichhoelzer = 13
    spieler = 0 #welcher spieler dran ist (spieler 1 = spieler 0, spieler 2 = spieler 1)
    while streichhoelzer>0: 
        visualisierung(streichhoelzer)

        a=0 
        if spieler==0:
            while a<1 or a>3: 
                a = int(input("Spieler 1 ist dran, wie viele Streichhölzer sollen genommen werden? (1-3)"))
                if (a<1 or a>3):
                    print("ungültige Eingabe")
        else: 
            while a<1 or a>3: 
                a = int(input("Spieler 2 ist dran, wie viele Streichhölzer sollen genommen werden? (1-3)"))
                if (a<1 or a>3):
                    print("ungültige Eingabe")
        streichhoelzer -=a
        
        if streichhoelzer<=0: 
            print("Spieler", spieler+1 ,"hat gewonnen")
            visualisierung(0)
        if spieler==0:
            spieler +=1
        else:
            spieler -=1
        
def visualisierung(n):
    vis = "============================================\nEs verbleiben noch " + str(n) + " Streichhölzer:\n"
    for _ in range(n): 
        vis +="()  "
    for _ in range(3):
        vis +="\n"
        for _ in range(n):
            vis +="||  "
    print(vis)

streichholzspiel()