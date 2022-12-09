import numpy as np
C = np.array([[2/np.sqrt(5),1/np.sqrt(5)],[1/np.sqrt(5),-2/np.sqrt(5)]])
C_inv = np.linalg.inv(C)
print(C_inv)
S = 1/9*np.array([[19,2],[2,16]])
diag = C_inv@S@C
print(diag)