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
        if chance <= FEATURED_CHARACTER_PROBABILITY and chance > PILGRIM_PROBABILITY:
            featured = True
        elif chance <= PILGRIM_PROBABILITY:
            character_group = "Pilgrims"
        else:
            character_group = "SSR_characters"
    elif result <= SSR_PROBABILITY + SR_PROBABILITY:
        character_group = "SR_characters"
    elif result <= SCAM_PROBABILITY:
        character_group = "Scams"
    else:
        character_group = "R_characters"
    if featured != True:
        character = random.choice(gacha_characters[character_group])
    else:
        character = featured_character
    
    print("Pulling...")
    time.sleep(1.5)
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
    time.sleep(1.5)
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
    
def enter_ticket_shop():
    global gold_tickets, silver_tickets, inventory

    while True:
        print("\n--- Ticket Shop ---")
        print("1. Buy Limited Character (Cost: 200 Gold Tickets)")
        print("2. Buy Spare Body Part (Cost: 200 Silver Tickets)")
        print("3. Return to Main Menu")

        choice = input("Enter your choice: ")
        if choice == "1":
            if gold_tickets >= 200:
                print("Congratulations! You obtained the limited character!")
                gold_tickets -= 200
                inventory["SSR_characters"].append(featured_character)
                print(f"You obtained the limited character: {featured_character}")
                break
            else:
                print("Insufficient gold tickets. Please try again.")
        elif choice == "2":
            if silver_tickets >= 200:
                print("Congratulations! You bought a spare body part!")
                silver_tickets -= 200
                spare_body_part = random.choice(gacha_characters["SSR_characters"])
                inventory["SSR_characters"].append(spare_body_part)
                print(f"You obtained a spare body part: {spare_body_part}")
                break
            else:
                print("Insufficient silver tickets. Please try again.")
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