CREATE TABLE `pupuk` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(50) NOT NULL,         
  `tipe` VARCHAR(50) DEFAULT NULL,    
  `stok` INT(11) NOT NULL,            
  `deskripsi` TEXT DEFAULT NULL,      
  PRIMARY KEY (`id`)
);

CREATE TABLE `bibit` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(50) NOT NULL,        
  `jenis` VARCHAR(50) DEFAULT NULL,  
  `stok` INT(11) NOT NULL,           
  `deskripsi` TEXT DEFAULT NULL,     
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(50) NOT NULL,       
  `email` VARCHAR(50) NOT NULL,      
  `password` TEXT NOT NULL,          
  PRIMARY KEY (`id`)
);

INSERT INTO `users` (`nama`, `email`, `password`) VALUES
('Admin', 'admin@pertanian.com', 'admin123'),
('Staff', 'staff@pertanian.com', 'staff123');
