import numpy as np
import random
def create_matrix(n, m):
    if n<2 or m<2: # invalid inputs
        print("Ungültig gewählte Parameter")
        return
    matrix = {}
    for i in range(n):
        for j in range(m):
            matrix[f"x{i}_{j}"] = random.randint(-2000,4000) # a key has the form "x{rows}_{columns}"
    return matrix 
rows = int(input("Wie viele Zeilen soll die Matrix haben?\n> "))
col = int(input("Wie viele Spalten soll die Matrix haben?\n> "))
matrix = create_matrix(rows,col)

keys = list(matrix.keys())

res = f"({matrix[keys[0]]}"

for i in range(len(keys)-1):
    key1 = keys[i]
    key2 = keys[i+1]
    
    if key1.split("_")[0] != key2.split("_")[0]:
        res += f")\n({matrix[key2]}"
    else:
        res += f" {matrix[key2]}"
res += ")"

def get_column_elem_len(i, matrix):
    col = []
    for sublist in matrix:
        for j, elem in enumerate(sublist):
            if j == i:
                col.append(len(str(elem)))
    return col

def format_matrix(matrix):
    #converts the dictionary-matrix to a list
    lst = []
    sublist = []
    keys = list(matrix.keys())
    for i in range(len(keys)-1):
        key1 = keys[i]
        key2 = keys[i+1]

        sublist.append(matrix[key1])
        if key1.split("_")[0] != key2.split("_")[0]:
            lst.append(sublist)
            sublist=[]
        if i == len(keys)-2:
            sublist.append(matrix[key2])
            lst.append(sublist)

    res = ""
    for sublist in lst:
        res += "("
        for j, elem in enumerate(sublist):
            l = max(get_column_elem_len(j,lst))
            l_elem = len(str(elem))
            res += (l-l_elem) * " " + str(elem) + " "
        res = res[0:-1] + ")\n"
    print(res[0:-1]) 
    
print(f"Number of rows: {rows}")
print(f"Number of columns: {col}\n")
print(res)
print()
format_matrix(matrix)