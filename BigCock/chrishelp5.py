import os

CARDS = ["✿", "❄", "★", "♥", "✉", "✂", "✖", "✈", "♫", "☀",
         "✿", "❄", "★", "♥", "✉", "✂", "✖", "✈", "♫", "☀"]


def get_cards():
    return CARDS


# TODO: Implement fucntion
def create_grid(cards):
    """


    """


    grid = []
    for j in range(4):
        x_list = []
        for x in range(5):
            x_list.append(cards[j * 5 + x])
        grid.append(x_list)
    return grid


# TODO: Implement fucntion
def get_symbols(grid, pos1, pos2):
    """


    """


    x1 = ord(pos1[0]) - 65
    y1 = int(pos1[1]) - 1
    x2 = ord(pos2[0]) - 65
    y2 = int(pos2[1]) - 1
    a = grid[y1][x1]
    b = grid[y2][x2]
    return a, b
print(get_symbols(create_grid(CARDS), "E1", "A2"))


# TODO: Implement fucntion
def take_cards(grid, pos1, pos2):
    """


    """


    a, b = get_symbols(grid, pos1, pos2)
    if a == b:
        x1 = ord(pos1[0]) - 65
        y1 = int(pos1[1]) - 1
        x2 = ord(pos2[0]) - 65
        y2 = int(pos2[1]) - 1
        grid[y1][x1] = "  "
        grid[y2][x2] = "  "
    return grid

def draw_grid(grid, pos1=None, pos2=None):

    os.system('cls')
    if pos1 != None and pos2 != None:
        a, b = get_symbols(grid, pos1, pos2)

    for i in range(len(grid)):
        s = ""
        for j in range(len(grid[0])):
            if grid[i][j] != "  ":
                pos = chr(65 + j) + str(i + 1)
                if pos != pos1 and pos != pos2:
                    s += pos + " "
                elif pos == pos1:
                    s += a + "  "
                else: 
                    s += b + "  "
            else: 
                s += "   "
        print(s)

grid = create_grid(CARDS)
grid = take_cards(grid, 'B1', 'B3') 
draw_grid(grid, 'C1', 'D2')
        
    
