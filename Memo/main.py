import tkinter as tk 
import tkinter.ttk as ttk
from tkinter.constants import *
from functools import partial
import os

books = {}

with open('data.txt','r') as f:
    tempBooks = f.read()
    tempBooks = tempBooks.split('\n')
    tempBooks = [x for x in tempBooks if x.strip()]

    i=0
    while i<len(tempBooks):
        if i+1!=len(tempBooks) and tempBooks[i+1]=="-url-":
            books[tempBooks[i]] = tempBooks[i+2]
            i += 3
        else:
            books[tempBooks[i]] = None
            i += 1

def color_config(widget, color, event):
    widget.configure(foreground=color)

def createFrame1Content():
    for widget in frame1.winfo_children():
        widget.destroy()

    headline = tk.Label(frame1, font=('Arial', 30), text="Bücher", bg="gray", pady=10)
    headline.pack()

    for book in books.keys():
        label = tk.Label(frame1, font=('Arial', 12), text=book, bg=('gray'), pady=5)
        label.bind("<Enter>", partial(color_config, label, "#34579E"))
        label.bind("<Leave>", partial(color_config, label, "black"))
        url = books[book]
        label.bind("<Button-1>", lambda e, url=url:openUrl(url))
        label.pack()

def createFrame1Content2(): # for deleting
    for widget in frame1.winfo_children():
        widget.destroy()

    frame1.columnconfigure(0, weight=1)
    frame1.columnconfigure(4, weight=1)

    headline = tk.Label(frame1, font=('Arial', 30), text="Bücher", bg="gray", pady=10)
    headline.grid(row=0, column=1, columnspan=2)

    for i, book in enumerate(books.keys()):
        label = tk.Label(frame1, font=('Arial', 12), text=book, bg=('gray'), pady=5)
        label.grid(row=i+1, column=1, padx=5)
        label.bind("<Enter>", partial(color_config, label, "#34579E"))
        label.bind("<Leave>", partial(color_config, label, "black"))
        url = books[book]
        label.bind("<Button-1>", lambda e, url=url:openUrl(url))
        button = tk.Button(frame1, text='Löschen', bg='gray', fg='white', command=lambda i=i: deleteBook(i+1, 1))
        button.grid(row=i+1, column=2)

def createFrame1Content3(): # for updating
    for widget in frame1.winfo_children():
        widget.destroy()
    
    frame1.columnconfigure(0, weight=1)
    frame1.columnconfigure(4, weight=1)

    headline = tk.Label(frame1, font=('Arial', 30), text="Bücher", bg="gray", pady=10)
    headline.grid(row=0, column=1, columnspan=3)

    stringVars = []
    for i, book in enumerate(books.keys()):
        label = tk.Label(frame1, font=('Arial', 12), text=book, bg=('gray'), pady=5)
        label.grid(row=i+1, column=1, padx=5)
        label.bind("<Enter>", partial(color_config, label, "#34579E"))
        label.bind("<Leave>", partial(color_config, label, "black"))
        url = books[book]
        label.bind("<Button-1>", lambda e, url=url:openUrl(url))
        stringVar = tk.StringVar()
        entry = tk.Entry(frame1, textvariable=stringVar)
        entry.grid(row=i+1, column=2, padx=5)
        stringVars.append(stringVar)
        button = tk.Button(frame1, text='Update', bg='gray', fg='white', command=lambda i=i, stringVar = stringVar: updateBook(i+1, 1, stringVar.get()))
        button.grid(row=i+1, column=3)

def addBook(event=None): 
    if book_input!="":
        books[book_input.get()] = None
        book_input.set("")

    createFrame1Content()

def deleteBook(r, c):
    widget = frame1.grid_slaves(row=r, column=c)[0]
    book = widget.cget('text')
    del books[book]
    createFrame1Content2()

def deleteCheckbox(): # löschen Checkbox is pressed
    if var1.get()==1:
        if var2.get()==1:
            var2.set(2)
        createFrame1Content2()
    else:
        createFrame1Content()

def updateBook(r, c, value):
    if "." in value:
        widget = frame1.grid_slaves(row=r, column=c)[0]
        book = widget.cget('text')
        books[book] = value

        createFrame1Content3()
        label = tk.Label(frame1, font=('Arial', 10), text=f"{book} url updatet to: \n{books[book]}", bg='gray', wraplength=500)
        label.grid(column=1, columnspan=3, pady=20)
    else:
        createFrame1Content3()
        label = tk.Label(frame1, font=('Arial', 10), text="Not a correct URL", bg='gray')
        label.grid(column=1, columnspan=3, pady=20)

def updateCheckbox(): # updaten Checkbox is pressed
    if var2.get()==1:
        if var1.get()==1:
            var1.set(0)
        createFrame1Content3()
    else:
        createFrame1Content()

def openUrl(url):
    if url!=None:
        os.system(f"start \"\" {url}")
    else:
        if var1.get()==0 and var2.get()==0:
            createFrame1Content()
            label = tk.Label(frame1, font=('Arial', 10), text="No URL was set for this Book", bg='gray')
            label.pack(pady=20)
            return
        elif var1.get()==1:
            createFrame1Content2()
        else:
            createFrame1Content3()
        label = tk.Label(frame1, font=('Arial', 10), text="No URL was set for this Book", bg='gray')
        label.grid(column=1, columnspan=3, pady=20)

root = tk.Tk()

root.grid_columnconfigure(0, weight=1)

canvas = tk.Canvas(root, height=700, width=700, bg='black')
canvas.pack()

frame1 = tk.Frame(root, bg='gray') # Listing of Books Frame
frame1.place(relwidth=0.9,relheight=0.75,relx=0.05,rely=0.05)

createFrame1Content()

frame2 = tk.Frame(root, bg="gray") # Adding Books Frame
frame2.place(relwidth=0.9, relheight=0.15,relx=0.05,rely=0.8)

frame2.columnconfigure(0, weight=1)
frame2.columnconfigure(3,weight=1)

book_input = tk.StringVar()
entry = tk.Entry(frame2, textvariable=book_input)
entry.grid(row=1, column=1, padx=5, pady=5)

button = tk.Button(frame2, text='Speichern', bg='gray', fg='white', command=addBook)
button.grid(row=1, column=2)

var1 = tk.IntVar()
checkbox1 = tk.Checkbutton(frame2, text='Löschen', font=('Arial', 12), variable=var1, onvalue=1, offvalue=0, command=deleteCheckbox, bg="gray", activebackground="gray")
checkbox1.grid(row=2, column=1, columnspan=2)
var2 = tk.IntVar()
checkbox1 = tk.Checkbutton(frame2, text='Updaten', font=('Arial', 12), variable=var2, onvalue=1, offvalue=0, command=updateCheckbox, bg="gray", activebackground="gray")
checkbox1.grid(row=3, column=1, columnspan=2)

root.bind("<Return>", addBook)

root.mainloop()





with open('data.txt', 'w') as f:
    for book in books.keys():
        f.write(book + "\n")
        if books[book] != None:
            f.write(f'-url-\n{books[book]}\n')
