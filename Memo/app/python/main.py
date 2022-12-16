file = open('data.txt', 'r')
memos = []
for line in file:
    memos.append(line)


while True:
    new_memo = input("Was willst du reinschreiben? ('q' to quit)\n>")
    if new_memo == "q":
        break
    memos.append(new_memo)

file = open('data.txt', 'w')
for memo in memos:
    file.write(memo + "\n")

for memo in memos:
    print(memo + "\n")