import sys

def convert(n):
    y = (int(n) * 1.8) + 32
    print(y)

convert(sys.argv[1]);