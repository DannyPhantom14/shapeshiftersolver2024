from shapeshifterpy import *

# Level 1
# board = Board('101,000,000', 1)
# pieces = ['1', '111']

#####################################################################################################
# REPLACE THE CODE HERE WITH YOUR PUZZLE CODE

# Level 1
# board = Board('101,000,000', 1)
# pieces = ['1', '111']

#####################################################################################################

solution = Solver(board, [Piece(s) for s in pieces]).solve()

if solution is not None:
    for move in solution:
        x, y = solution[move]
        # Adjust for 1-based indexing in the printout
        print(f'Move {move + 1}: Place piece at column {x}, row {y}')
else:
    print('Yeah...this will not solve your puzzle.')
