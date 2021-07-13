# Booking

BookMyShow provides a ticket booking experience for customers across
multiple verticals - from live events and movies, to festivals and
attractions.
A reserved seating event has pre-assigned seats when the customers buy
the tickets online.
# Problem Statement
It’s your first week on the job and you are tasked with creating a Restful API
endpoint that allocate continuous available seats upon customer request.
Each request will indicate the number of seats requested.
Once the block of seats is allocated, the seats will be marked as reserved and
will not be selected for the next request.
Note that the allocated block of seats may be changed back to available or to
sold after period of time by another function in the system.
Each seat has a rank number which determine the sequence of allocation. E.g.
seat with rank of 1 is selected before the seat with a rank of 20. Lowest rank
is allocated first from left to right.

