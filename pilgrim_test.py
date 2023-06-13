import random

PILGRIM_PROBABILITY = 0.00075
count = 0
while True:
    result = random.random()
    if result <= PILGRIM_PROBABILITY:
        print("Pilgrim")
        print("IT ONLY TOOK " + str(count) + " TRIES")
        break
    else:
        print("Not pilgrim")
        count += 1