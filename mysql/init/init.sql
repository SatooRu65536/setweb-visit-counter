CREATE DATABASE IF NOT EXISTS sysweb_db;

use sysweb_db;

CREATE TABLE
  IF NOT EXISTS `visitor` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `path` VARCHAR(16) NOT NULL,
    `date` DATETIME NOT NULL
  );