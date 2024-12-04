# Projects


<br>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Zoom Effect</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }

    .image-container {
      text-align: center; /* Center the content */
      height: 100vh; /* Full viewport height */
      width: 100%; /* Ensure the container takes up full width */
      background-color: #f0f0f0; /* Light background color */
      display: flex; /* Use flex to arrange items horizontally */
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
    }

    .image {
      width: 60%; /* Adjust size to fit container */
      max-width: 600px; /* Maximum width */
      max-height: 100%; /* Prevent height from overflowing */
      object-fit: contain; /* Ensure image scales proportionally */
      border-radius: 20px; /* Rounded corners */
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Shadow effect */
      cursor: pointer; /* Change cursor to indicate interaction */
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: block; /* Make image a block element to help center it */
      margin: 0 auto; /* Ensure image is centered within its container */
    }

    .image.zoomed {
      transform: scale(2); /* Zoom in the image */
      z-index: 10; /* Ensure the zoomed image appears on top */
      cursor: zoom-out; /* Change cursor when zoomed in */
    }
  </style>
</head>

<body>
  {{< admonition type=quote title="1. Eroded Jigsaw Puzzle Solving Using Siamese Neural Network and GAN" open=false >}}
  Designed an end-to-end framework that integrates with an inpainting model and a hyper-heuristic algorithm to solve the jigsaw puzzle problem.
  <br>
  <br>
  [Poster](https://drive.google.com/file/d/1Nr2QTImf2IcZPTJvUhrtCa1nU9iLDLdS/view?usp=sharing) | Paper and code are coming soon.~
  <br>
  ***Jianxu Shangguan**, Xingke Song, Jianfeng Ren*
  {{< /admonition >}}

  <div class="image-container">
    <img src="/puzzle_solving/PIEN.png" alt="Image" class="image" ondblclick="toggleZoom(this)">
  </div>


  {{< admonition type=quote title="2. Quantum Reinforcement Learning for Electric Vehicle Charging" open=false >}}
  Developed QRL algorithms, including Q-DDPG, Q-PPO, and Q-DQN to optimize EV charging strategies under fluctuating electricity prices and constrained grid environments.
  <br>
  <br>
  [Manuscript](https://drive.google.com/file/d/1AXzM2qLoPIgE7jOuenLsrXIBusoE_rQZ/view?usp=sharing) | Paper and code are coming soon.~
  <br>
  *Zheyuan Jiang, **Jianxu Shangguan**, Ziyang Wang, Tianxiang Cui*
  {{< /admonition >}}

  <div class="image-container">
    <img src="/QRL/dqn.png" alt="Image" class="image" ondblclick="toggleZoom(this)">
  </div>

  
  {{< admonition type=quote title="3. Retinal Vessel Segmentation Using U-Net Deep Learning Model" open=false >}}
  Explored the integration of edge detection algorithms with a U-Net-based ML network, providing deeper insights into the structural nuances of retinal images.
  <br>
  <br>
  [Manuscript](https://drive.google.com/file/d/1ljHjuUYeJ7PuPm_VWQZV9-yEk4EtGSv7/view?usp=sharing)
  <br>
  ***Jianxu Shangguan***
  {{< /admonition >}}

  <div class="image-container">
    <img src="/retinal_vessel/gaussion-filter.png" alt="Image" class="image" ondblclick="toggleZoom(this)">
  </div>


  {{< admonition type=quote title="4. A Virtual Human For University Recruitment" open=false >}}
  Developed a fully customizable AI virtual human with a complete front-end and back-end architecture.
  <br>
  <br>
  [Handbook](https://drive.google.com/file/d/1xcNXItEambB0gJE8eTXxJW70VtxkTp1j/view?usp=sharing)
  <br>
  *Ziyang Wang, Bin Jia, **Jianxu Shangguan**, Eajun Yik Jun Ooi, YunXiang Shi, Jianfeng Ren*
  {{< /admonition >}}

  <div class="image-container">
    <img src="/virtual_human/link.png" alt="Image" class="image" ondblclick="toggleZoom(this)">
  </div>

  <script>
    // Function to toggle zoom effect on double-click
    function toggleZoom(img) {
      img.classList.toggle("zoomed"); // Toggle zoomed class on double-click
    }
  </script>
</body>





