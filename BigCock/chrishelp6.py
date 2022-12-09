import chrishelp5 as memory 
from random import randint 
from time import sleep

def no_cards_left(grid):
    for sublist in grid:
        for elem in sublist:
            if elem != "  ":
                return False
    return True

def correct_input(grid, pos):
    letter = ['A', 'B', 'C', 'D', 'E']
    number = ['1', '2', '3', '4', '5']
    if not pos[0] in letter or not pos[1] in number:
        return False
    elif len(pos)!=2:
        return False
    elif pos in grid_empty_cards(grid):
        return False
    return True

def grid_empty_cards(grid):
    l = []
    for i, lst in enumerate(grid):
        for j, elem in enumerate(lst):
            if elem == "  ":
                l.append(chr(65 + j) + str(i + 1))
    return l 

def memory_game():
    cards = memory.get_cards()
    shuffled = []
    print(cards)
    while cards != []:
        i = randint(0, len(cards)-1)
        shuffled.append(cards.pop(i))
    print(shuffled)

    grid = memory.create_grid(shuffled)

    rounds = 0

    while not no_cards_left(grid):
        memory.draw_grid(grid)
        
        while True:
            pos1 = input("Wähle die Position der ersten Karte, die du aufgedeckt haben willst: ")
            if correct_input(grid, pos1):
                break
            print("Kein korrekter Input")
        while True:
            pos2 = input("Wähle die Position der zweite Karte, die du aufgedeckt haben willst: ")
            if correct_input(grid, pos2):
                break
            print("Kein korrekter Input")

        memory.draw_grid(grid, pos1, pos2)
        sleep(3)
        memory.draw_grid(grid)
        grid = memory.take_cards(grid, pos1, pos2)
        rounds += 1

    print(f"Du hast {rounds} Runden gebraucht um alle Karten aufzudecken")

    play_again = input("Willst du erneut spielen (y/n)")

    if play_again == "y":
        memory_game()

memory_game()

