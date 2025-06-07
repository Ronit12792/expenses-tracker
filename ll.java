// A linked lis
class Node {
    int data;
    Node next;

    // Constructor to initialize a new node with data
    Node(int new_data) {
        this.data = new_data;
        this.next = null;
    }
}

public class ll {

    // Function to traverse and print the singly linked list
    public static void traverseList(Node head) {

        // A loop that runs till head is nullptr
        while (head != null) {

            // Printing data of current node
            System.out.print(head.data + " ");

            // Moving to the next node
            head = head.next;
        }
        System.out.println();
    }

    // Driver code
    public static void main(String[] args) {
      
        // Create a hard-coded linked list:
        // 10 -> 20 -> 30 -> 40
        Node head = new Node(10);
        head.next = new Node(20);
        head.next.next = new Node(30);
        head.next.next.next = new Node(40);

        // Example of traversing the node and printing
        traverseList(head);
    }
}