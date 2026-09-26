-- 3. Create the table
CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Add in some examples
INSERT INTO product (name, price, description) VALUES
('iPhone 15', 799.99, 'Apple smartphone latest model'),
('Samsung Galaxy S24', 849.00, 'Flagship Samsung phone with AI'),
('Mechanical Keyboard', 59.50, 'Blue switch RGB gaming keyboard');