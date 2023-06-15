"""
@Author: Reiden Rufin
@Co-Author: Nathan Eden
"""

from functions import *

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

run_gacha_simulator()

