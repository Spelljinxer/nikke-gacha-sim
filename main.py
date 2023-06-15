"""
@Author: Reiden Rufin
@Co-Author: Nathan Eden
"""

import json
import random
import time
from prettytable import PrettyTable

with open("gacha_characters.json") as f:
    gacha_characters = json.load(f)

GEMS_PER_PULL = 300
STARTING_GEMS = 60000
SSR_PROBABILITY = 0.04
FEATURED_CHARACTER_PROBABILITY = 0.04
SR_PROBABILITY = 0.43
R_PROBABILITY = 0.53
PILGRIM_PROBABILITY = 0.00075
SCAM_PROBABILITY = 0.00074

gems = STARTING_GEMS
gold_tickets = 0
silver_tickets = 0
inventory = {
    "SSR_characters": [],
    "SR_characters": [],
    "R_characters": [],
    "Pilgrims": [],
    "Scams": []
}

featured_character = None
def gacha_pull(user_input):
    global gems, gold_tickets, silver_tickets, inventory

    if gems < GEMS_PER_PULL:
        print("Insufficient gems. Please consider buying more gems.")
        return

    gems -= GEMS_PER_PULL

    # Perform the gacha pull
    result = random.random()
    if result <= SSR_PROBABILITY:
        chance = random.random()
        if chance <= PILGRIM_PROBABILITY:
            character_group = "Pilgrims"
        else:
            character_group = "SSR_characters"
    elif result <= SSR_PROBABILITY + SR_PROBABILITY:
        character_group = "SR_characters"
    elif result <= SCAM_PROBABILITY:
        character_group = "Scams"
    else:
        character_group = "R_characters"
    character = random.choice(gacha_characters[character_group])

    print("Pulling...")
    time.sleep(1)
    print(f"You pulled a {character_group[:-11]} character: {character}")

    if user_input == 1:
        gold_tickets += 1
    elif user_input == 2:
        silver_tickets += 1

    if any(character in entry for entry in inventory[character_group]):
        for i, existing_character in enumerate(inventory[character_group]):
            if character in existing_character:
                if '(' in existing_character:
                    suffix = int(existing_character.split('(')[1][:-1]) + 1
                    inventory[character_group][i] = f"{character}({suffix})"
                else:
                    inventory[character_group][i] = f"{character}(1)"
                break
    else:
        inventory[character_group].append(character)

def gacha_pull_10(user_input):
    global gems, gold_tickets, silver_tickets, inventory

    if gems < GEMS_PER_PULL * 10:
        print("Insufficient gems. Please consider buying more gems.")
        return

    gems -= GEMS_PER_PULL * 10

    print("Pulling...")
    time.sleep(1)
    characters = []
    for i in range(10):
        result = random.random()

        if result <= SSR_PROBABILITY:
            chance = random.random()
            if chance <= PILGRIM_PROBABILITY:
                character_group = "Pilgrims"
            else:
                character_group = "SSR_characters"
        elif result <= SSR_PROBABILITY + SR_PROBABILITY:
            character_group = "SR_characters"
        else:
            character_group = "R_characters"
        character = random.choice(gacha_characters[character_group])
        characters.append([character_group, character])
        print(f"You pulled a {character_group[:-11]} character: {character}")

    if user_input == 3:
        gold_tickets += 10
    elif user_input == 4:
        silver_tickets += 10

    for character_info in characters:
        character_group = character_info[0]
        character = character_info[1]

        if any(character in entry for entry in inventory[character_group]):
            for i, existing_character in enumerate(inventory[character_group]):
                if character in existing_character:
                    if '(' in existing_character:
                        suffix = int(existing_character.split('(')[1][:-1]) + 1
                        inventory[character_group][i] = f"{character}({suffix})"
                    else:
                        inventory[character_group][i] = f"{character}(1)"
                    break
        else:
            inventory[character_group].append(character)

def display_inventory():
    print("\n--- Inventory ---")
    print(f"Gems: {gems}")
    print(f"Gold Tickets: {gold_tickets}")
    print(f"Silver Tickets: {silver_tickets}")
    print("--- Characters ---")

    table = PrettyTable()
    table.field_names = ["Rarity", "Characters"]

    table.add_row(["\033[33mPilgrims\033[0m", "\n".join(inventory["Pilgrims"])])
    table.add_row(["\033[93mSSR\033[0m", "\n".join(inventory["SSR_characters"])])
    table.add_row(["\033[95mSR\033[0m", "\n".join(inventory["SR_characters"])])
    table.add_row(["\033[94mR\033[0m", "\n".join(inventory["R_characters"])])
    
    print(table)

def buy_gems():
    global gems
    print("YOU REALLY GONNA SWIPE FOR PIXELS???")
    gems_to_buy = int(input("Enter the number of gems to buy: "))
    gems += gems_to_buy
    print(f"You bought {gems_to_buy} gems. Current gems: {gems}")

def sexy_character():
    print("⣿⣿⡻⠿⣳⠸⢿⡇⢇⣿⡧⢹⠿⣿⣿⣿⣿⣾⣿⡇⣿⣿⣿⣿⡿⡐⣯⠁ ⠄⠄")
    print("⠟⣛⣽⡳⠼⠄⠈⣷⡾⣥⣱⠃⠣⣿⣿⣿⣯⣭⠽⡇⣿⣿⣿⣿⣟⢢⠏⠄ ⠄")
    print("⢠⡿⠶⣮⣝⣿⠄⠄⠈⡥⢭⣥⠅⢌⣽⣿⣻⢶⣭⡿⠿⠜⢿⣿⣿⡿⠁⠄⠄")
    print("⠄⣼⣧⠤⢌⣭⡇⠄⠄⠄⠭⠭⠭⠯⠴⣚⣉⣛⡢⠭⠵⢶⣾⣦⡍⠁⠄⠄⠄⠄")
    print("⠄⣿⣷⣯⣭⡷⠄⠄⢀⣀⠩⠍⢉⣛⣛⠫⢏⣈⣭⣥⣶⣶⣦⣭⣛⠄⠄⠄⠄⠄")
    print("⢀⣿⣿⣿⡿⠃⢀⣴⣿⣿⣿⣎⢩⠌⣡⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠄⠄⠄")
    print("⢸⡿⢟⣽⠎⣰⣿⣿⣿⣿⣿⣿⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠄⠄")
    print("⣰⠯⣾⢅⣼⣿⣿⣿⣿⣿⣿⡇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠄")
    print("⢰⣄⡉⣼⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠄")
    print("⢯⣌⢹⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄")
    print("⢸⣇⣽⣿⣿⣿⣿⣿⣿⣿⣿⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄")
    print("⢸⣟⣧⡻⣿⣿⣿⣿⣿⣿⣿⣧⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄")
    print("⠈⢹⡧⣿⣸⠿⢿⣿⣿⣿⣿⡿⠗⣈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄")
    print("⠄⠘⢷⡳⣾⣷⣶⣶⣶⣶⣶⣾⣿⣿⢀⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠄")
    print("⠄⠄⠈⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄")
    print("⠄⠄⠄⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠄⠄")
    print("nikke ASSociation")

def secret_code():
    gems += 3000
    
def initialise_gold_ticket_shop():
    global gold_ticket_shop, gold_ticket_items
    gold_ticket_items = random.sample(gacha_characters["SSR_characters"], 2)
    gold_ticket_shop = PrettyTable()
    gold_ticket_shop.field_names = ["Option","Item","Cost"]
    for i in range(len(gold_ticket_items)):
        gold_ticket_shop.add_row([i+1,gold_ticket_items[i],200])
    gold_ticket_shop.add_row([3,"Return to Ticket Shop",None])

def initialise_silver_ticket_shop():
    global silver_ticket_shop, silver_ticket_items
    silver_ticket_items = random.sample(gacha_characters["SR_characters"], 5)
    silver_ticket_shop = PrettyTable()
    silver_ticket_shop.field_names = ["Option","Item","Cost"]
    for i in range(len(silver_ticket_items)):
        silver_ticket_shop.add_row([i+1,silver_ticket_items[i],200])
    silver_ticket_shop.add_row([6,"Return to Ticket Shop",None])

def duplicate_handler(character, character_group):
    if any(character in entry for entry in inventory[character_group]):
        for i, existing_character in enumerate(inventory[character_group]):
            if character in existing_character:
                if '(' in existing_character:
                    suffix = int(existing_character.split('(')[1][:-1]) + 1
                    inventory[character_group][i] = f"{character}({suffix})"
                else:
                    inventory[character_group][i] = f"{character}(1)"
                break
    else:
        inventory[character_group].append(character)

def enter_ticket_shop():
    global gold_tickets, silver_tickets, inventory, gold_ticket_shop, gold_ticket_items, silver_ticket_shop, silver_ticket_items

    ticket_shop = PrettyTable()
    ticket_shop.field_names = ["Option","Description"]
    ticket_shop.add_row(["1","Gold Ticket Shop"])
    ticket_shop.add_row(["2","Silver Ticket Shop"])
    ticket_shop.add_row(["3","Return to Main Menu"])


    while True:
        print(ticket_shop)
        choice = input("Enter your choice: ")
        if choice == "1":
            print(gold_ticket_shop)
            gold_choice = input("You wish to buy a character?: ")
            if gold_choice == "1":
                if gold_tickets >= 200:
                    gold_tickets -= 200
                    character = gold_ticket_items[0]
                    duplicate_handler(character, "SSR_characters")
                    print(f"You purchased {character} for 200 gold tickets.")
                else:
                    print("Insufficient gold tickets. Please try again.")            
            elif gold_choice == "2":
                if gold_tickets >= 200:
                    gold_tickets -= 200
                    character = gold_ticket_items[1]
                    duplicate_handler(character, "SSR_characters")
                    print(f"You purchased {character} for 200 gold tickets.")
                else:
                    print("Insufficient gold tickets. Please try again.")
            elif gold_choice == "3":
                enter_ticket_shop()
                print("You returned to the ticket shop.")
        elif choice == "2":
            print(silver_ticket_shop)
            silver_choice = input("You wish to buy some spare body parts?: ")
            if silver_choice == "1":
                pass
            elif silver_choice == "2":
                pass
            elif silver_choice == "3":
                pass
            elif silver_choice == "4":
                pass
            elif silver_choice == "5":
                pass
            elif silver_choice == "6":
                enter_ticket_shop()
                print("You returned to the ticket shop.")
            
        elif choice == "3":
            print("Returning to the main menu...")
            break
        else:
            print("Invalid choice. Please try again.")



def show_menu():
    menu_table = PrettyTable()
    menu_table.field_names = ["Option", "Description"]

    menu_table.add_row(["1", f"Pull on Limited Banner (Costs {GEMS_PER_PULL} Gems) | Featured Character: {featured_character}"])
    menu_table.add_row(["2", f"Pull on Ordinary Banner (Costs {GEMS_PER_PULL} Gems)"])
    menu_table.add_row(["3", f"Pull 10 on Limited Banner (Costs {GEMS_PER_PULL * 10} Gems) | Featured Character: {featured_character}"])
    menu_table.add_row(["4", f"Pull 10 on Ordinary Banner (Costs {GEMS_PER_PULL * 10} Gems)"])
    menu_table.add_row(["5", "Buy Gems"])
    menu_table.add_row(["6", "View Inventory"])
    menu_table.add_row(["7", f"Enter Ticket Shop | Gold Tickets: {gold_tickets}, Silver Tickets: {silver_tickets}"])
    menu_table.add_row(["8", "Enter KREYGASM Mode"])
    menu_table.add_row(["9", "Exit"])

    print("\n--- Main Menu ---")
    print(menu_table)

def run_gacha_simulator():
    initialise_gold_ticket_shop()
    initialise_silver_ticket_shop()
    while True:
        show_menu()
        choice = input("Enter your choice: ")
        if choice == "1":
            gacha_pull(1)
        elif choice == "2":
            gacha_pull(2)
        elif choice == "3":
            gacha_pull_10(3)
        elif choice == "4":
            gacha_pull_10(4)
        elif choice == "5":
            buy_gems()
        elif choice == "6":
            display_inventory()
        elif choice == "7":
            enter_ticket_shop()
            print("exited correctly")
        elif choice == "8":
            sexy_character()
        elif choice == "9":
            print("Exiting...")
            break
        elif choice == "secret_code":
            print("Wow! You found the secret code! You get 3000 gems!")
            secret_code()
        else:
            print("Invalid choice. Please try again.")

featured_character = random.choice(gacha_characters["SSR_characters"])
run_gacha_simulator()

