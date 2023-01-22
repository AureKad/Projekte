from numpy import empty,zeros,max
from pylab import imshow,gray,show

# Constants
M = 100         # Grid squares on a side
V = 1.0         # Voltage at top wall
target = 1e-4   # Target accuracy

# Create arrays to hold potential values
phi = zeros([M+1,M+1],float)
phi[20:40,60:80] = V
phi[60:80,20:40] = -V
phiprime = empty([M+1,M+1],float)

delta = 1.0
while delta>target:

    # Calculate new values of the potential
    for i in range(M+1):
        for j in range(M+1):
            if i==0 or i==M or j==0 or j==M:
                phiprime[i,j] = phi[i,j]
            else:
                phiprime[i,j] = (phi[i+1,j] + phi[i-1,j] 
                                 + phi[i,j+1] + phi[i,j-1])/4
                phiprime[i,j] += 1/(4) * 1

    # Calculate maximum difference from old values
    delta = max(abs(phi-phiprime))
    print(delta)

    # Swap the two arrays around
    phi,phiprime = phiprime,phi

# Make a plot
imshow(phi)
gray()
show()