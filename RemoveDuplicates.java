import java.util.*;
import java.io.*;

public class RemoveDuplicates {
	public static void main(String[] args) throws FileNotFoundException {
		Scanner input = new Scanner(new File(args[0]));
		Set<String> seenNames = new HashSet<String>();
		
		while (input.hasNextLine()) {
			String line = input.nextLine();
			String name = line.split(":", 2)[0];
			if (seenNames.contains(name)) {
				System.out.println("Duplicate: " + name);
			} else {
				seenNames.add(name);
			}
		}
		
		
	}
}