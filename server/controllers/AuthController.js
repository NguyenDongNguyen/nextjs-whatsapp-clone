import getPrismaInstance from '../utils/PrismaClient.js';

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ message: 'Email is required', status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.json({ message: 'User not found', status: false });
    } else {
      return res.json({ message: 'User found', status: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { name, email, about, image: profilePicture } = req.body;
    if (!name || !email || !profilePicture) {
      return res.send('Email, Name and Image are required');
    }
    const prisma = getPrismaInstance();
    await prisma.user.create({
      data: {
        name,
        email,
        profilePicture,
        about,
      },
    });
    return res.json({ message: 'Success', status: true });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        about: true,
        profilePicture: true,
      },
    });
    const usersGroupedByInitialLetter = {};
    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter] = [];
      }
      usersGroupedByInitialLetter[initialLetter].push(user);
    });
    return res.status(200).send({ users: usersGroupedByInitialLetter });
  } catch (error) {
    next(error);
  }
};
