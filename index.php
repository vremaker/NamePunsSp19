<?php
  # Valerie Remaker
  # CSE154 Section AD
  # Creative Project
  #
  # Php to process the directory of puns being presented to the user!
  # User can select a specifc name, or to see all of the name puns
  error_reporting(E_ALL);
  header("Content-type:text/plain");
  $puns = array();
  foreach (file("puns.txt") as $line) {
    $tokens = explode(":", $line);
    if(count($tokens) === 3) {
      $puns[strtolower($tokens[0])] = [trim($tokens[1]), trim($tokens[2])];
    }
  }
  if(isset($_GET["name"])) {
    $name = strtolower($_GET["name"]);
      if(array_key_exists($name, $puns)) {
        header('Content-Type: application/json');
        foreach($puns as $key => $value) {
          if($key === $name) {
            echo json_encode($value);
          }
        }
      } else if($name === "random") {
        $pos = array_rand($puns);
        foreach($puns as $key => $value) {
          if($key === $pos) {
            echo json_encode($value);
          }
        }
      } else {
          header("HTTP/1.1 400 Invalid Request");
          echo "Are you sure you registered for CSE154?";
      }
  } else {
    header("HTTP/1.1 400 Invalid Request");
    echo "You are missing parameters!";
  }
?>
