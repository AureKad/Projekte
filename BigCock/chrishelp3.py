def schachbrett(n):
    vis =""
    for i in range(n):
        vis +="\n"
        for j in range(n):
            vis += chr(j+65) + str(i+1) + " "
    print(vis)

def schachbrett_koenigin(n, pos_koengin):
    vis =""
    x,y = pos_koengin[0], int(pos_koengin[1:])
    x = ord(x)

    if y>n or x-64>n or y<1 or x-64<1: #Fehlermeldung
        print("Königin kann nicht auf dem Schachbrett positioniert werden")
        return 

    for i in range(n):
        vis +="\n"
        for j in range(n):
            if(x==j+65 and y==i+1):
                vis += "QQ "
            else:
                vis += chr(j+65) + str(i+1) + " "
    print(vis)


import math 
r = 3**2 - 4*4*4
print(complex(0,math.sqrt(-r)))
